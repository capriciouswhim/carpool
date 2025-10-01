import { createReducer, on } from "@ngrx/store";
import { carpoolInitialState, CarpoolState } from "./carpool.state";
import { carpoolAction } from "./carpool.action";
import { ApiException, CarpoolResponse, TypedPoolNumber } from "../model";

export const carpoolReducer = createReducer(
  carpoolInitialState,
    on(carpoolAction.get_success,(s,a) => updateHistory(s,a)),
    on(carpoolAction.reset_success,(s,a) => updateHistory(s,a)),
    on(carpoolAction.resetLane_success,(s,a) => updateHistory(s,a)),
    on(carpoolAction.add_success,(s,a) => updateHistory(s,a)),
    on(carpoolAction.del_success,(s,a) => updateHistory(s,a)),
    on(carpoolAction.callOne_success,(s,a) => updateHistory(s,a)),
    on(carpoolAction.callMany_success,(s,a) => updateHistory(s,a)),
    on(carpoolAction.callAll_success,(s,a) => updateHistory(s,a)),
    on(carpoolAction.setOptionCallImmediate_success,(s,a) => updateHistory(s,a)),
    on(carpoolAction.send_success,(s,a) => updateHistory(s,a)),
    on(carpoolAction.escort_success,(s,a) => updateHistory(s,a)),
    on(carpoolAction.dispatch_success,(s,a) => updateHistory(s,a)),

    on(carpoolAction.get_failure,(s,a) => updateFailure(s,a)),
    on(carpoolAction.reset_failure,(s,a) => updateFailure(s,a)),
    on(carpoolAction.resetLane_failure,(s,a) => updateFailure(s,a)),
    on(carpoolAction.add_failure,(s,a) => updateFailure(s,a)),
    on(carpoolAction.del_failure,(s,a) => updateFailure(s,a)),
    on(carpoolAction.callOne_failure,(s,a) => updateFailure(s,a)),
    on(carpoolAction.callMany_failure,(s,a) => updateFailure(s,a)),
    on(carpoolAction.callAll_failure,(s,a) => updateFailure(s,a)),
    on(carpoolAction.setOptionCallImmediate_failure,(s,a) => updateFailure(s,a)),
    on(carpoolAction.send_failure,(s,a) => updateFailure(s,a)),
    on(carpoolAction.escort_failure,(s,a) => updateFailure(s,a)),
    on(carpoolAction.dispatch_failure,(s,a) => updateFailure(s,a))
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

function updateFailure(state: CarpoolState, action: ApiException): CarpoolState {
  console.dir(action);

  return {
    ...state,
    errorMessage: 'Please contact support@artsyteachy.com.'
  }
}

