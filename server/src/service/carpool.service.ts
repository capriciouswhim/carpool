import { PrismaClient } from "generated/prisma/index.js";
import { CarpoolResponse } from "src/model/carpool-response.model.js";
import { Util } from "src/util.js";

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
                      && h.exit_time === null)
            .sort((a,b) => a.lane_time!.localeCompare(b.lane_time!))

        const call = history
            .filter(h => h.call_time !== null
                      && h.recall_time === null 
                      && h.send_time === null
                      && h.exit_time === null)
            .sort((a,b) => a.call_time!.localeCompare(b.call_time!))

        const recall = history
            .filter(h => h.call_time !== null
                      && h.recall_time !== null 
                      && h.send_time === null
                      && h.exit_time === null)
            .sort((a,b) => a.recall_time!.localeCompare(b.recall_time!))
        
        const send = history
            .filter(h => h.call_time !== null
                      && h.recall_time !== null 
                      && h.send_time !== null
                      && h.exit_time === null)
            .sort((a,b) => a.send_time!.localeCompare(b.send_time!))
    
        const exit = history
            .filter(h => h.call_time !== null
                      && h.recall_time !== null 
                      && h.send_time !== null
                      && h.exit_time !== null)
            .sort((a,b) => a.exit_time!.localeCompare(b.exit_time!))

        const callImmediate = await this.getOptionCallImmediate()

        return { lane, call, recall, send, exit, callImmediate }
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
            pool_number   :poolNumber,
            lane_date     :today_date,
            lane_time     :lane_time,
            call_time     :callImmediate ? lane_time : null,
            send_time     :null,
            exit_time     :null
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

    // Lane removes number not called
    async laneDel(poolNumber: number) {
        const today_date = Util.formatDate(new Date())

        await this.db.history.delete({
            where: {
                pool_number_lane_date: {
                    pool_number: poolNumber,
                    lane_date: today_date,
                },
                call_time     :null,
                send_time     :null,
                exit_time     :null                
            }
        })
    }

    // Door calls number
    async doorCallOne(poolNumber: number) {
        const now = new Date()
        const today_date = Util.formatDate(now)
        const call_time = Util.formatTime(now)

        const dbRecord = await this.db.history.findUniqueOrThrow({
            where: {
                pool_number_lane_date: {
                    pool_number: poolNumber,
                    lane_date: today_date
                }
            }
        })

        let payload
        if(dbRecord.call_time) {
            payload = {
                recall_time: call_time
            }
        } else {
            payload = {
                call_time
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
                lane_date     :today_date,
                call_time     :null,
                send_time     :null,
                exit_time     :null
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
                lane_date     :today_date,
                call_time     :null,
                send_time     :null,
                exit_time     :null
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
                lane_date     :today_date,
                call_time     :null,
                send_time     :null,
                exit_time     :null
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
        
        await this.db.history.update({
            where: {
                pool_number_lane_date: {
                    pool_number: poolNumber,
                    lane_date: today_date
                },
                send_time     :null,
                exit_time     :null
            },
            data: {
                send_time
            }
        })
    }

    // Door exits number
    async doorExit(poolNumber: number) {
        const now = new Date()
        const today_date = Util.formatDate(now)
        const exit_time = Util.formatTime(now)
        
        await this.db.history.update({
            where: {
                pool_number_lane_date: {
                    pool_number: poolNumber,
                    lane_date: today_date
                },
                exit_time     :null
            },
            data: {
                exit_time
            }
        })
    }
}