import { CarpoolResponse as APICarpoolResponse } from '../../../api/src/model/carpool-response.model.js'
import { fixAxiosDates, PoolNumber } from "./pool-number.model";

interface CarpoolResponse {
    history: PoolNumber[],
    future: PoolNumber[],
    paused: boolean
}

export function fixAxiosResponse(carpoolResponse: APICarpoolResponse): CarpoolResponse {
    return {
        ...carpoolResponse,
        history: carpoolResponse.history.map(h => fixAxiosDates(h)),
        future: carpoolResponse.future.map(f => fixAxiosDates(f))
    }
}

export type { APICarpoolResponse, CarpoolResponse }