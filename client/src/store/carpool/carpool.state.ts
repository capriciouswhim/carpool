import { CarpoolResponse, TypedPoolNumber } from "../../model"

export const carpoolSource = 'carpool'

export interface CarpoolState extends CarpoolResponse {
  lane: TypedPoolNumber[],
  call: TypedPoolNumber[],
  recall: TypedPoolNumber[],
  send: TypedPoolNumber[],
  exit: TypedPoolNumber[],
  gone: TypedPoolNumber[],
  callImmediate: boolean,
  errorMessage: string | null
}

export const carpoolInitialState: CarpoolState = {
  lane: [],
  call: [],
  recall: [],
  send: [],
  exit: [],
  gone: [],
  callImmediate: false,
  errorMessage: null
}
