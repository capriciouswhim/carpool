import { CarpoolResponse, TypedPoolNumber } from "../model"
import { carpoolReducer } from "./carpool.reducer"

export const carpoolSource = 'carpool'

export interface CarpoolState extends CarpoolResponse {
  lane: TypedPoolNumber[],
  call: TypedPoolNumber[],
  recall: TypedPoolNumber[],
  send: TypedPoolNumber[],
  exit: TypedPoolNumber[],
  gone: TypedPoolNumber[],
  callImmediate: boolean
}

export const carpoolInitialState: CarpoolState = {
  lane: [],
  call: [],
  recall: [],
  send: [],
  exit: [],
  gone: [],
  callImmediate: false
}
