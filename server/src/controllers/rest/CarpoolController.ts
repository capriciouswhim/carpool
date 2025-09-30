import { Controller } from "@tsed/di";
import { BodyParams, PathParams, QueryParams } from "@tsed/platform-params";
import { Delete, Get, Patch, Post, Put, Tags } from "@tsed/schema";
import { CarpoolResponse } from "../../model/carpool-response.model.js";
import { CarpoolService } from "../../service/carpool.service.js";

@Controller("/carpool")
export class CarpoolController {
    carpoolService = new CarpoolService()

    // Get complete current state
    @Get('/')
    @Tags("mainline")
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
    @Tags("undo")
    async reset(): Promise<CarpoolResponse> {
        await this.carpoolService.reset()
        return this.Respond()
    }

    // Remove all numbers not called
    @Delete('/')
    @Tags("undo")
    async resetLane(): Promise<CarpoolResponse> {
        await this.carpoolService.resetLane()
        return this.Respond()
    }

    // Lane adds number
    @Put('/:poolNumber')
    @Tags("mainline")
    async laneAdd(@PathParams("poolNumber") poolNumber: number): Promise<CarpoolResponse> {
        await this.carpoolService.laneAdd(poolNumber)
        return this.Respond()
    }

    // Lane removes number not called
    @Delete('/:poolNumber')
    @Tags("undo")
    async laneDel(@PathParams("poolNumber") poolNumber: number): Promise<CarpoolResponse> {
        await this.carpoolService.laneDel(poolNumber)
        return this.Respond()
    }

    // Door calls number
    @Patch('/:poolNumber/call')
    @Tags("mainline")
    async doorCallOne(@PathParams("poolNumber") poolNumber: number): Promise<CarpoolResponse> {
        await this.carpoolService.doorCallOne(poolNumber)
        return this.Respond()
    }

    // Door calls next N numbers
    @Patch('/call')
    @Tags("feature")
    async doorCallMany(@QueryParams("n") n: number): Promise<CarpoolResponse> {
        await this.carpoolService.doorCallMany(n)
        return this.Respond()
    }

    // Door calls all numbers
    @Patch('/call/all')
    @Tags("feature")
    async doorCallAll(): Promise<CarpoolResponse> {
        await this.carpoolService.doorCallAll()
        return this.Respond()
    }

    // Door wants new numbers called immediately
    @Put('/option/callImmediate')
    @Tags("options")
    async setOptionCallImmediate(@QueryParams("option") value: boolean): Promise<CarpoolResponse> {
        await this.carpoolService.setOptionCallImmediate(value)
        return this.Respond()
    }

    // Room sends number to door
    @Patch('/:poolNumber/send')
    @Tags("mainline")
    async roomSend(@PathParams("poolNumber") poolNumber: number): Promise<CarpoolResponse> {
        await this.carpoolService.roomSend(poolNumber)
        return this.Respond()
    }

    // Door exits number
    @Patch('/:poolNumber/exit')
    @Tags("mainline")
    async doorExit(@PathParams("poolNumber") poolNumber: number): Promise<CarpoolResponse> {
        await this.carpoolService.doorExit(poolNumber)
        return this.Respond()
    }

    // Escort dispatches number
    @Patch('/:poolNumber/gone')
    @Tags("mainline")
    async escortGone(@PathParams("poolNumber") poolNumber: number): Promise<CarpoolResponse> {
        await this.carpoolService.escortGone(poolNumber)
        return this.Respond()
    }
}
