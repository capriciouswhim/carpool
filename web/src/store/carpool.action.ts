import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { carpoolSource } from "./carpool.state";
import { CarpoolResponse } from "../model";
import { ApiException } from "../model/api.exception";

export const carpoolAction = createActionGroup({
  source: carpoolSource,
  events: {
    add: props<{ poolNumber: number }>(),
    add_success: props<CarpoolResponse>(),
    add_failure: props<ApiException>(),

    cls: emptyProps(),
    cls_success: props<CarpoolResponse>(),
    cls_failure: props<ApiException>(),

    fetch: emptyProps(),
    fetch_success: props<CarpoolResponse>(),
    fetch_failure: props<ApiException>(),

    pause: emptyProps(),
    pause_success: props<CarpoolResponse>(),
    pause_failure: props<ApiException>(),

    horn: emptyProps(),

    resume: emptyProps(),
    resume_success: props<CarpoolResponse>(),
    resume_failure: props<ApiException>(),

    rel: props<{ poolNumber: number }>(),
    rel_success: props<CarpoolResponse>(),
    rel_failure: props<ApiException>(),

    rem: props<{ poolNumber: number }>(),
    rem_success: props<CarpoolResponse>(),
    rem_failure: props<ApiException>(),

    togglePause: emptyProps(),
    togglePause_success: props<CarpoolResponse>(),
    togglePause_failure: props<ApiException>(),
  }
})
