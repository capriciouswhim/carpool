import { createFeature, createSelector } from "@ngrx/store";
import { reducer } from './reducer'
import { TypedPoolNumber } from "../model";
import { source } from "./state";

export const feature = createFeature({
  name: source,
  reducer: reducer
})

function laneOrder(poolNumbers: TypedPoolNumber[]) {
  return [...poolNumbers].sort((a,b) => a.sort.localeCompare(b.sort))
}

function numericOrder(poolNumbers: TypedPoolNumber[]) {
  return [...poolNumbers].sort((a,b) => a.pool_number - b.pool_number)
}

export const selectHaveData = createSelector(feature.selectAppState, state => {
  return 0 < (state.lane.length + state.call.length + state.recall.length + state.send.length + state.exit.length + state.gone.length)
})

export const selectAll = createSelector(feature.selectAppState, state => {
  return [
    ...laneOrder(state.lane),
    ...numericOrder([
      ...state.call,
      ...state.recall
    ]),
    ...numericOrder(state.send),
    ...numericOrder(state.exit),
    ...numericOrder(state.gone)
  ]
})

export const selectCallImmediate = feature.selectCallImmediate
export const selectErrorMessage = feature.selectErrorMessage
export const selectOverscan = createSelector(feature.selectSettings, settings => settings.overscan)