import { CarpoolResponse } from "src/model/carpool-response.model.js";
import { PrismaClient } from "generated/prisma/index.js";

export class CarpoolService {
    db = new PrismaClient()

    async paused() {
        const flag = await this.db.flags.findUnique({ where: { name: 'paused' } })
        return flag ? flag.value : false
    }

    async callPoolNumber(poolNumber: number) {
        let payload = {
            poolNumber,
            paused: await this.paused(),
            called: new Date(),
            released: null
        }

        await this.db.history.upsert({
            where: { poolNumber },
            create: payload,
            update: payload
        })

        return this.getCarpoolState()
    }

    async resume() {
        const payload = {
            name: 'paused',
            value: false
        }

        await this.db.$transaction([
            this.db.flags.upsert({
                where: { name: 'paused' },
                create: payload,
                update: payload
            }),
            this.db.history.updateMany({
                where: {
                    paused: true
                },
                data: {
                    called: new Date(),
                    paused: false
                }
            })
        ])
         
        return this.getCarpoolState()
    }

    async getCarpoolState(): Promise<CarpoolResponse> {
        const paused = await this.paused()
        const history = await this.db.history.findMany()

        return {
            history: history.filter(poolNumber => !poolNumber.paused),
            future: history.filter(poolNumber => poolNumber.paused),
            paused: paused
        }
    }

    async pause() {
        const payload = {
            name: 'paused',
            value: true
        }

        await this.db.flags.upsert({
            where: { name: 'paused' },
            create: payload,
            update: payload
        })

        return this.getCarpoolState()
    }

    async releasePoolNumber(poolNumber: number) {
        let payload = {
            poolNumber,
            paused: false,
            released: new Date()
        }

        await this.db.history.upsert({
            where: { poolNumber },
            create: payload,
            update: payload
        })

        return this.getCarpoolState()
    }

    async removePoolNumber(poolNumber: number) {
        await this.db.history.delete({
            where: { poolNumber }
        })    
        
        return this.getCarpoolState()
    }

    async reset() {
        await this.db.history.deleteMany();

        return this.getCarpoolState();
    }

    async togglePause() {
        const paused = await this.paused()

        if(paused) {
            return this.resume()
        } else {
            return this.pause()
        }
    }
}