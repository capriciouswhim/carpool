import { ActionCreatorProps, createReducer, on } from "@ngrx/store";
import { carpoolInitialState, CarpoolState } from "./carpool.state";
import { carpoolAction } from "./carpool.action";
import { CarpoolResponse } from "../model";

export const carpoolReducer = createReducer(
  carpoolInitialState,
    on(carpoolAction.get_success,(s,a) => updateHistory(s,a)),
    on(carpoolAction.reset_success,(s,a) => updateHistory(s,a)),
    on(carpoolAction.resetLane_success,(s,a) => updateHistory(s,a)),
    on(carpoolAction.laneAdd_success,(s,a) => updateHistory(s,a)),
    on(carpoolAction.laneDel_success,(s,a) => updateHistory(s,a)),
    on(carpoolAction.doorCallOne_success,(s,a) => updateHistory(s,a)),
    on(carpoolAction.doorCallMany_success,(s,a) => updateHistory(s,a)),
    on(carpoolAction.doorCallAll_success,(s,a) => updateHistory(s,a)),
    on(carpoolAction.setOptionCallImmediate_success,(s,a) => updateHistory(s,a)),
    on(carpoolAction.roomSend_success,(s,a) => updateHistory(s,a)),
    on(carpoolAction.doorExit_success,(s,a) => updateHistory(s,a))
)

function updateHistory(state: CarpoolState, action: CarpoolResponse): CarpoolState {
  return {
    ...state,
    ...action
  }
}
