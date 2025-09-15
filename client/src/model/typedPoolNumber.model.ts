import { PoolNumber as APIPoolNumber } from "../../../server/src/model/pool-number.model";

export type PoolNumberState = 'LANE' | 'CALL' | 'RECALL' | 'SEND' | 'EXIT' | 'GONE'

export class TypedPoolNumber extends APIPoolNumber {
     state         :PoolNumberState = 'LANE'
     sort          :string = '9999-99-99'
}