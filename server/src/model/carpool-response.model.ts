import { PoolNumber } from "./pool-number.model.js";

export interface CarpoolResponse {
    lane          :PoolNumber[],
    call          :PoolNumber[],
    recall        :PoolNumber[],
    send          :PoolNumber[],
    exit          :PoolNumber[],
    gone          :PoolNumber[],
    callImmediate :boolean
}