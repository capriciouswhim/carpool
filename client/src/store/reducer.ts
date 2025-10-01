import { createReducer, on } from "@ngrx/store";
import { initialState, State, enabled, disabled } from "./state";
import { actions } from "./actions";
import { ApiException, ApiResponse, TypedPoolNumber } from "../model";

export const reducer = createReducer(
  initialState,

    //
    // Settings
    //

    on(actions.setOverscan, (s,a) => setBoolean(s,'overscan', a)),

    //
    // API Success
    //

    on(actions.get_success,(s,a) => updateHistory(s,a)),
    on(actions.reset_success,(s,a) => updateHistory(s,a)),
    on(actions.resetLane_success,(s,a) => updateHistory(s,a)),
    on(actions.add_success,(s,a) => updateHistory(s,a)),
    on(actions.del_success,(s,a) => updateHistory(s,a)),
    on(actions.callOne_success,(s,a) => updateHistory(s,a)),
    on(actions.callMany_success,(s,a) => updateHistory(s,a)),
    on(actions.callAll_success,(s,a) => updateHistory(s,a)),
    on(actions.setOptionCallImmediate_success,(s,a) => updateHistory(s,a)),
    on(actions.exit_success,(s,a) => updateHistory(s,a)),
    on(actions.escort_success,(s,a) => updateHistory(s,a)),
    on(actions.dispatch_success,(s,a) => updateHistory(s,a)),

    //
    // API Failure
    //

    on(actions.get_failure,(s,a) => updateFailure(s,a)),
    on(actions.reset_failure,(s,a) => updateFailure(s,a)),
    on(actions.resetLane_failure,(s,a) => updateFailure(s,a)),
    on(actions.add_failure,(s,a) => updateFailure(s,a)),
    on(actions.del_failure,(s,a) => updateFailure(s,a)),
    on(actions.callOne_failure,(s,a) => updateFailure(s,a)),
    on(actions.callMany_failure,(s,a) => updateFailure(s,a)),
    on(actions.callAll_failure,(s,a) => updateFailure(s,a)),
    on(actions.setOptionCallImmediate_failure,(s,a) => updateFailure(s,a)),
    on(actions.exit_failure,(s,a) => updateFailure(s,a)),
    on(actions.escort_failure,(s,a) => updateFailure(s,a)),
    on(actions.dispatch_failure,(s,a) => updateFailure(s,a))
)

interface SetBoolean { value: boolean }
function setBoolean(state: State, name: string, value: SetBoolean) {
    localStorage.setItem(name, value.value ? enabled : disabled)

    const result = {
        ...state
    }

    Object.defineProperty(result, name, { value: value.value })

    return result;
}

function updateHistory(state: State, apiResponse: ApiResponse): State {
  return {
    ...state,
    ...{
      lane: apiResponse.lane.map<TypedPoolNumber>(l => ({...l, state: 'LANE', sort: l.lane_time})),
      call: apiResponse.call.map<TypedPoolNumber>(l => ({...l, state: 'CALL', sort: l.lane_time})),
      recall: apiResponse.recall.map<TypedPoolNumber>(l => ({...l, state: 'RECALL', sort: l.lane_time})),
      send: apiResponse.send.map<TypedPoolNumber>(l => ({...l, state: 'SEND', sort: l.lane_time})),
      exit: apiResponse.exit.map<TypedPoolNumber>(l => ({...l, state: 'EXIT', sort: l.lane_time})),
      gone: apiResponse.gone.map<TypedPoolNumber>(l => ({...l, state: 'GONE', sort: l.lane_time})),
      callImmediate: apiResponse.callImmediate
    }
  }
}

function updateFailure(state: State, action: ApiException): State {
  return {
    ...state,
    errorMessage: 'Please contact support@artsyteachy.com.'
  }
}

