import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { carpoolSource } from "./carpool.state";
import { CarpoolResponse } from "../model";
import { ApiException } from "../model/api.exception";

export const carpoolAction = createActionGroup({
    source: carpoolSource,
    events: {
        get: emptyProps(),
        get_success: props<CarpoolResponse>(),
        get_failure: props<ApiException>(),

        reset: emptyProps(),
        reset_success: props<CarpoolResponse>(),
        reset_failure: props<ApiException>(),

        resetLane: emptyProps(),
        resetLane_success: props<CarpoolResponse>(),
        resetLane_failure: props<ApiException>(),

        laneAdd: props<{ poolNumber: number }>(),
        laneAdd_success: props<CarpoolResponse>(),
        laneAdd_failure: props<ApiException>(),

        laneDel: props<{ poolNumber: number }>(),
        laneDel_success: props<CarpoolResponse>(),
        laneDel_failure: props<ApiException>(),

        doorCallOne: props<{ poolNumber: number }>(),
        doorCallOne_success: props<CarpoolResponse>(),
        doorCallOne_failure: props<ApiException>(),

        doorCallMany: props<{ num: number }>(),
        doorCallMany_success: props<CarpoolResponse>(),
        doorCallMany_failure: props<ApiException>(),

        doorCallAll: emptyProps(),
        doorCallAll_success: props<CarpoolResponse>(),
        doorCallAll_failure: props<ApiException>(),

        setOptionCallImmediate: props<{ option: boolean }>(),
        setOptionCallImmediate_success: props<CarpoolResponse>(),
        setOptionCallImmediate_failure: props<ApiException>(),

        roomSend: props<{ poolNumber: number }>(),
        roomSend_success: props<CarpoolResponse>(),
        roomSend_failure: props<ApiException>(),

        doorExit: props<{ poolNumber: number }>(),
        doorExit_success: props<CarpoolResponse>(),
        doorExit_failure: props<ApiException>(),
    }
})
