import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { carpoolSource } from "./carpool.state";
import { ApiException, CarpoolResponse } from "../../model";

export const carpoolAction = createActionGroup({
    source: carpoolSource,
    events: {
        poll: emptyProps(),
        test: emptyProps(),
        
        get: emptyProps(),
        get_success: props<CarpoolResponse>(),
        get_failure: props<ApiException>(),

        reset: emptyProps(),
        reset_success: props<CarpoolResponse>(),
        reset_failure: props<ApiException>(),

        resetLane: emptyProps(),
        resetLane_success: props<CarpoolResponse>(),
        resetLane_failure: props<ApiException>(),

        add: props<{ poolNumber: number }>(),
        add_success: props<CarpoolResponse>(),
        add_failure: props<ApiException>(),

        del: props<{ poolNumber: number }>(),
        del_success: props<CarpoolResponse>(),
        del_failure: props<ApiException>(),

        callOne: props<{ poolNumber: number }>(),
        callOne_success: props<CarpoolResponse>(),
        callOne_failure: props<ApiException>(),

        callMany: props<{ num: number }>(),
        callMany_success: props<CarpoolResponse>(),
        callMany_failure: props<ApiException>(),

        callAll: emptyProps(),
        callAll_success: props<CarpoolResponse>(),
        callAll_failure: props<ApiException>(),

        setOptionCallImmediate: props<{ option: boolean }>(),
        setOptionCallImmediate_success: props<CarpoolResponse>(),
        setOptionCallImmediate_failure: props<ApiException>(),

        send: props<{ poolNumber: number }>(),
        send_success: props<CarpoolResponse>(),
        send_failure: props<ApiException>(),

        exit: props<{ poolNumber: number }>(),
        exit_success: props<CarpoolResponse>(),
        exit_failure: props<ApiException>(),

        gone: props<{ poolNumber: number }>(),
        gone_success: props<CarpoolResponse>(),
        gone_failure: props<ApiException>()
    }
})
