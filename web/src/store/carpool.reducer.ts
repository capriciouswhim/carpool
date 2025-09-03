import { createReducer, on } from "@ngrx/store";
import { carpoolInitialState, CarpoolState } from "./carpool.state";
import { carpoolAction } from "./carpool.action";
import { CarpoolResponse } from "../model/carpool-response.model";

export const carpoolReducer = createReducer(
  carpoolInitialState,
  on(carpoolAction.add_success,(s,a) => updateHistory(s,a)),
  on(carpoolAction.cls_success,(s,a) => updateHistory(s,a)),
  on(carpoolAction.fetch_success,(s,a) => updateHistory(s,a)),
  on(carpoolAction.pause_success,(s,a) => updateHistory(s,a)),
  on(carpoolAction.rem_success,(s,a) => updateHistory(s,a)),
  on(carpoolAction.resume_success,(s,a) => updateHistory(s,a)),
  on(carpoolAction.togglePause_success,(s,a) => updateHistory(s,a)),
)

function updateHistory(state: CarpoolState, action: CarpoolResponse): CarpoolState {
  return {
    ...state,
    now: new Date(),
    paused: action.paused,
    history: [...action.history],
    future: [...action.future]
  }
}
