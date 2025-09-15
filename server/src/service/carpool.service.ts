import { PrismaClient } from "../../generated/prisma/client.js";
import { CarpoolResponse } from "../model/carpool-response.model.js";
import { Util } from "../util.js";

export class CarpoolService {
    db = new PrismaClient()

    // Get current state of call immediate option
    async getOptionCallImmediate() {
        const result = await this.db.flag.findUnique({
            where: {
                name: 'callImmediate'
            }
        })

        return result?.value ?? false;
    }

    // Get complete current state
    async get(): Promise<CarpoolResponse> {
        const today_date = Util.formatDate(new Date())

        const history = await this.db.history.findMany({
            where: {
                lane_date: today_date // limit results to today
            }
        })

        const lane = history
            .filter(h => h.call_time === null
                && h.recall_time === null
                && h.send_time === null
                && h.exit_time === null
                && h.gone_time === null)
            .sort((a, b) => a.lane_time!.localeCompare(b.lane_time!))

        const call = history
            .filter(h => h.call_time !== null
                && h.recall_time === null
                && h.send_time === null
                && h.exit_time === null
                && h.gone_time === null)
            .sort((a, b) => a.call_time!.localeCompare(b.lane_time!))

        const recall = history
            .filter(h => h.recall_time !== null
                && h.send_time === null
                && h.exit_time === null
                && h.gone_time === null)
            .sort((a, b) => a.recall_time!.localeCompare(b.lane_time!))

        const send = history
            .filter(h => h.send_time !== null
                && h.exit_time === null
                && h.gone_time === null)
            .sort((a, b) => a.send_time!.localeCompare(b.lane_time!))

        const exit = history
            .filter(h => h.exit_time !== null
                && h.gone_time === null)
            .sort((a, b) => a.exit_time!.localeCompare(b.lane_time!))

        const gone = history
            .filter(h => h.gone_time !== null)
            .sort((a, b) => a.gone_time!.localeCompare(b.lane_time!))

        const callImmediate = await this.getOptionCallImmediate()

        return { lane, call, recall, send, exit, gone, callImmediate }
    }

    // Remove all numbers from this day
    async reset() {
        const today_date = Util.formatDate(new Date())

        await this.db.history.deleteMany({
            where: {
                lane_date: today_date
            }
        })
    }

    // Remove all numbers not called
    async resetLane() {
        const today_date = Util.formatDate(new Date())

        await this.db.history.deleteMany({
            where: {
                lane_date: today_date,
                call_time: null,
                send_time: null,
                exit_time: null
            }
        })
    }

    // Lane adds number
    async laneAdd(poolNumber: number) {
        const now = new Date()
        const today_date = Util.formatDate(now)
        const lane_time = Util.formatTime(now)

        const callImmediate = await this.getOptionCallImmediate()

        const payload = {
            pool_number: poolNumber,
            lane_date: today_date,
            lane_time: lane_time,
            call_time: callImmediate ? lane_time : null,
            recall_time: null,
            send_time: null,
            exit_time: null,
            gone_time: null
        }

        await this.db.history.upsert({
            where: {
                pool_number_lane_date: {
                    pool_number: poolNumber,
                    lane_date: today_date
                }
            },
            create: payload,
            update: payload
        })
    }

    // Lane removes number (not yet called)
    async laneDel(poolNumber: number) {
        const today_date = Util.formatDate(new Date())

        await this.db.history.deleteMany({
            where: {
                pool_number: poolNumber,
                lane_date: today_date,
            }
        })
    }

    // Door calls number
    async doorCallOne(poolNumber: number) {
        const now = new Date()
        const today_date = Util.formatDate(now)
        const call_time = Util.formatTime(now)

        const dbRecord = await this.db.history.findUnique({
            where: {
                pool_number_lane_date: {
                    pool_number: poolNumber,
                    lane_date: today_date
                }
            }
        })

        if (null === dbRecord) {
            return;
        }

        let payload
        if (dbRecord.call_time) {
            payload = {
                recall_time: call_time,
                send_time: null,
                exit_time: null,
                gone_time: null
            }
        } else {
            payload = {
                call_time,
                recall_time: null,
                send_time: null,
                exit_time: null,
                gone_time: null
            }
        }

        await this.db.history.update({
            where: {
                pool_number_lane_date: {
                    pool_number: poolNumber,
                    lane_date: today_date
                }
            },
            data: payload
        })
    }

    // Door calls next N numbers
    async doorCallMany(n: number) {
        const now = new Date()
        const today_date = Util.formatDate(now)
        const call_time = Util.formatTime(now)

        const list = await this.db.history.findMany({
            where: {
                lane_date: today_date,
                call_time: null,
                send_time: null,
                exit_time: null
            },
            orderBy: {
                lane_time: 'asc'
            },
            take: n
        })

        await this.db.history.updateMany({
            where: {
                pool_number: {
                    in: list.map(i => i.pool_number)
                },
                lane_date: today_date,
                call_time: null,
                send_time: null,
                exit_time: null
            },
            data: {
                call_time
            }
        })
    }

    // Door calls all numbers
    async doorCallAll() {
        const now = new Date()
        const today_date = Util.formatDate(now)
        const call_time = Util.formatTime(now)

        await this.db.history.updateMany({
            where: {
                lane_date: today_date,
                call_time: null,
                send_time: null,
                exit_time: null
            },
            data: {
                call_time
            }
        })
    }

    // Door wants new numbers called immediately
    async setOptionCallImmediate(value: boolean) {
        const payload = {
            name: 'callImmediate',
            value
        }

        await this.db.flag.upsert({
            where: {
                name: 'callImmediate'
            },
            create: payload,
            update: payload
        })
    }

    // Room sends number to door
    async roomSend(poolNumber: number) {
        const now = new Date()
        const today_date = Util.formatDate(now)
        const send_time = Util.formatTime(now)

        await this.db.history.updateMany({
            where: {
                pool_number: poolNumber,
                lane_date: today_date
            },
            data: {
                send_time,
                exit_time: null,
                gone_time: null
            }
        })
    }

    // Door exits number
    async doorExit(poolNumber: number) {
        const now = new Date()
        const today_date = Util.formatDate(now)
        const exit_time = Util.formatTime(now)

        await this.db.history.updateMany({
            where: {
                pool_number: poolNumber,
                lane_date: today_date
            },
            data: {
                exit_time,
                gone_time: null
            }
        })
    }

    // Escort dispatches number
    async escortGone(poolNumber: number) {
        const now = new Date()
        const today_date = Util.formatDate(now)
        const gone_time = Util.formatTime(now)

        await this.db.history.updateMany({
            where: {
                pool_number: poolNumber,
                lane_date: today_date,
            },
            data: {
                gone_time
            }
        })
    }
}