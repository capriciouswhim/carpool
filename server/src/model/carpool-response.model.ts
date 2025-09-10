import { PoolNumber } from "./pool-number.model.js";

export interface CarpoolResponse {
    lane          :PoolNumber[],
    call          :PoolNumber[],
    send          :PoolNumber[],
    exit          :PoolNumber[],
    callImmediate :boolean
}