import { Controller } from "@tsed/di";
import { PathParams } from "@tsed/platform-params";
import { Delete, Get, Post } from "@tsed/schema";
import { CarpoolService } from "src/service/carpool.service.js";

@Controller("/carpool")
export class CarpoolController {
  carpoolService = new CarpoolService()

  @Get("/")
  get() {
    return this.carpoolService.getCarpoolState()
  }

  @Delete("/")
  reset() {
    return this.carpoolService.reset()
  }

  @Post('/pause')
  pause() {
    return this.carpoolService.pause()
  }

  @Post('/resume')
  resume() {
    return this.carpoolService.resume()
  }

  @Post('/togglePause')
  togglePause() {
    return this.carpoolService.togglePause()
  }

  @Post('/:poolNumber')
  call(@PathParams("poolNumber") poolNumber: number) {
    return this.carpoolService.callPoolNumber(poolNumber);
  }

  @Post('/release/:poolNumber')
  release(@PathParams("poolNumber") poolNumber: number) {
    return this.carpoolService.releasePoolNumber(poolNumber);
  }

  @Delete('/:poolNumber')
  remove(@PathParams("poolNumber") poolNumber: number) {
    return this.carpoolService.removePoolNumber(poolNumber);
  }
}
