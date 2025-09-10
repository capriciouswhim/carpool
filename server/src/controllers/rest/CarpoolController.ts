import { Controller } from "@tsed/di";
import { PathParams, QueryParams } from "@tsed/platform-params";
import { Delete, Get, Patch, Put } from "@tsed/schema";
import { CarpoolResponse } from "src/model/carpool-response.model.js";
import { CarpoolService } from "src/service/carpool.service.js";

@Controller("/carpool")
export class CarpoolController {
    carpoolService = new CarpoolService()

    // Get complete current state
    @Get('/')
    async get(): Promise<CarpoolResponse> {
        return this.carpoolService.get()
    }

    // Broadcast update
    async Broadcast(update: CarpoolResponse) {
    }

    async Respond() {
        const response = await this.carpoolService.get()
        this.Broadcast(response)
        return response
    }

    // Remove all numbers from this day
    @Delete('/reset')
    async reset(): Promise<CarpoolResponse> {
        await this.carpoolService.reset()
        return this.Respond()
    }

    // Remove all numbers not called
    @Delete('/')
    async resetLane(): Promise<CarpoolResponse> {
        await this.carpoolService.resetLane()
        return this.Respond()
    }

    // Lane adds number
    @Put('/:poolNumber')
    async laneAdd(@PathParams("poolNumber") poolNumber: number): Promise<CarpoolResponse> {
        await this.carpoolService.laneAdd(poolNumber)
        return this.Respond()
    }

    // Lane removes number not called
    @Delete('/:poolNumber')
    async laneDel(@PathParams("poolNumber") poolNumber: number): Promise<CarpoolResponse> {
        await this.carpoolService.laneDel(poolNumber)
        return this.Respond()
    }

    // Door calls number
    @Patch('/:poolNumber/call')
    async doorCallOne(@PathParams("poolNumber") poolNumber: number): Promise<CarpoolResponse> {
        await this.carpoolService.doorCallOne(poolNumber)
        return this.Respond()
    }

    // Door calls next N numbers
    @Patch('/call')
    async doorCallMany(@QueryParams("n") n: number): Promise<CarpoolResponse> {
        await this.carpoolService.doorCallMany(n)
        return this.Respond()
    }

    // Door calls all numbers
    @Patch('/call/all')
    async doorCallAll(): Promise<CarpoolResponse> {
        await this.carpoolService.doorCallAll()
        return this.Respond()
    }

    // Door wants new numbers called immediately
    @Put('/option/callImmediate')
    async setOptionCallImmediate(@QueryParams("option") value: boolean): Promise<CarpoolResponse> {
        await this.carpoolService.setOptionCallImmediate(value)
        return this.Respond()
    }

    // Room sends number to door
    @Patch('/:poolNumber/send')
    async roomSend(@PathParams("poolNumber") poolNumber: number): Promise<CarpoolResponse> {
        await this.carpoolService.roomSend(poolNumber)
        return this.Respond()
    }

    // Door exits number
    @Patch('/:poolNumber/exit')
    async doorExit(@PathParams("poolNumber") poolNumber: number): Promise<CarpoolResponse> {
        await this.carpoolService.doorExit(poolNumber)
        return this.Respond()
    }
}
