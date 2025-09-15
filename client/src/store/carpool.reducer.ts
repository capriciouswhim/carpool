import { ActionCreatorProps, createReducer, on } from "@ngrx/store";
import { carpoolInitialState, CarpoolState } from "./carpool.state";
import { carpoolAction } from "./carpool.action";
import { CarpoolResponse, TypedPoolNumber } from "../model";

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
    on(carpoolAction.doorExit_success,(s,a) => updateHistory(s,a)),
    on(carpoolAction.escortGone_success,(s,a) => updateHistory(s,a))
)

function updateHistory(state: CarpoolState, action: CarpoolResponse): CarpoolState {
  return {
    ...state,
    ...{
      lane: action.lane.map<TypedPoolNumber>(l => ({...l, state: 'LANE', sort: l.lane_time})),
      call: action.call.map<TypedPoolNumber>(l => ({...l, state: 'CALL', sort: l.lane_time})),
      recall: action.recall.map<TypedPoolNumber>(l => ({...l, state: 'RECALL', sort: l.lane_time})),
      send: action.send.map<TypedPoolNumber>(l => ({...l, state: 'SEND', sort: l.lane_time})),
      exit: action.exit.map<TypedPoolNumber>(l => ({...l, state: 'EXIT', sort: l.lane_time})),
      gone: action.gone.map<TypedPoolNumber>(l => ({...l, state: 'GONE', sort: l.lane_time})),
      callImmediate: action.callImmediate
    }
  }
}
