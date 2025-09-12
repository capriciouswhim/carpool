import { PoolNumber } from "../../../server/src/model/pool-number.model";
import { PoolNumberState } from "../component";

export class TypedPoolNumber extends PoolNumber {
     state         :PoolNumberState = 'LANE'
     sort          :string = '9999-99-99'
}