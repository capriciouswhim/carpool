import { PoolNumber } from "./pool-number.model.js";

export interface CarpoolResponse {
    history: PoolNumber[],
    future: PoolNumber[],
    paused: boolean
}