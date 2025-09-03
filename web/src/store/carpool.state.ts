import { PoolNumber } from "../model/pool-number.model"

export const carpoolSource = 'carpool'

export interface CarpoolState {
  now: Date,
  paused: boolean,
  history: PoolNumber[],
  future: PoolNumber[]
}

export const carpoolInitialState: CarpoolState = {
  now: new Date(),
  paused: false,
  history: [],
  future: []
}
