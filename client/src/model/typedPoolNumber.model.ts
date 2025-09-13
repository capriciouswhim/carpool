import { PoolNumber as APIPoolNumber } from "../../../server/src/model/pool-number.model";
import { PoolNumberState } from "../component";

export class TypedPoolNumber extends APIPoolNumber {
     state         :PoolNumberState = 'LANE'
     sort          :string = '9999-99-99'
}