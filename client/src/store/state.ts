import { ApiResponse, TypedPoolNumber } from "../model"

export const source = 'app'
export const enabled = '1'
export const disabled = ''

export interface State extends ApiResponse {
  lane: TypedPoolNumber[],
  call: TypedPoolNumber[],
  recall: TypedPoolNumber[],
  send: TypedPoolNumber[],
  exit: TypedPoolNumber[],
  gone: TypedPoolNumber[],
  callImmediate: boolean,
  errorMessage: string | null,
  settings: {
    overscan: boolean
  }
}

export const initialState: State = {
  lane: [],
  call: [],
  recall: [],
  send: [],
  exit: [],
  gone: [],
  callImmediate: false,
  errorMessage: null,
  settings: {
    overscan: localStorage.getItem('overscan') === enabled
  }
}
