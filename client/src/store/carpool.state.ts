import { CarpoolResponse } from "../model"

export const carpoolSource = 'carpool'

export interface CarpoolState extends CarpoolResponse {
  now: Date
}

export const carpoolInitialState: CarpoolState = {
  now: new Date(),
  lane: [],
  call: [],
  recall: [],
  send: [],
  exit: [],
  gone: [],
  callImmediate: false
}
