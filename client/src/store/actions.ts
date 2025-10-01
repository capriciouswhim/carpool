import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { source } from "./state";
import { ApiException, ApiResponse } from "../model";

export const actions = createActionGroup({
    source: source,
    events: {
        poll: emptyProps(),
        test: emptyProps(),

        //
        // Settings
        //

        setOverscan: props<{value: boolean}>(),
        
        //
        // API
        //

        get: emptyProps(),
        get_success: props<ApiResponse>(),
        get_failure: props<ApiException>(),

        reset: emptyProps(),
        reset_success: props<ApiResponse>(),
        reset_failure: props<ApiException>(),

        resetLane: emptyProps(),
        resetLane_success: props<ApiResponse>(),
        resetLane_failure: props<ApiException>(),

        add: props<{ poolNumber: number }>(),
        add_success: props<ApiResponse>(),
        add_failure: props<ApiException>(),

        del: props<{ poolNumber: number }>(),
        del_success: props<ApiResponse>(),
        del_failure: props<ApiException>(),

        callOne: props<{ poolNumber: number }>(),
        callOne_success: props<ApiResponse>(),
        callOne_failure: props<ApiException>(),

        callMany: props<{ num: number }>(),
        callMany_success: props<ApiResponse>(),
        callMany_failure: props<ApiException>(),

        callAll: emptyProps(),
        callAll_success: props<ApiResponse>(),
        callAll_failure: props<ApiException>(),

        setOptionCallImmediate: props<{ option: boolean }>(),
        setOptionCallImmediate_success: props<ApiResponse>(),
        setOptionCallImmediate_failure: props<ApiException>(),

        exit: props<{ poolNumber: number }>(),
        exit_success: props<ApiResponse>(),
        exit_failure: props<ApiException>(),

        escort: props<{ poolNumber: number }>(),
        escort_success: props<ApiResponse>(),
        escort_failure: props<ApiException>(),

        dispatch: props<{ poolNumber: number }>(),
        dispatch_success: props<ApiResponse>(),
        dispatch_failure: props<ApiException>()
    }
})
