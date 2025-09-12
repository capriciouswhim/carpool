import { createFeature, createSelector } from "@ngrx/store";
import { carpoolReducer } from './carpool.reducer'
import { carpoolSource } from './carpool.state'
import { TypedPoolNumber } from "../model";

export const carpoolFeature = createFeature({
  name: carpoolSource,
  reducer: carpoolReducer
})

const selectLane = createSelector(carpoolFeature.selectLane, l =>l.map<TypedPoolNumber>(l => ({...l, state: 'LANE', sort: l.lane_time})))
const selectCall = createSelector(carpoolFeature.selectCall, l => l.map<TypedPoolNumber>(l => ({...l, state: 'CALL', sort: l.call_time!})))
const selectRecall = createSelector(carpoolFeature.selectRecall, l => l.map<TypedPoolNumber>(l => ({...l, state: 'RECALL', sort: l.call_time!})))
const selectSend = createSelector(carpoolFeature.selectSend, l => l.map<TypedPoolNumber>(l => ({...l, state: 'SEND', sort: l.send_time!})))
const selectExit = createSelector(carpoolFeature.selectExit, l => l.map<TypedPoolNumber>(l => ({...l, state: 'EXIT', sort: l.exit_time!})))
const selectGone = createSelector(carpoolFeature.selectGone, l => l.map<TypedPoolNumber>(l => ({...l, state: 'GONE', sort: l.gone_time!})))

export const selectCalled = createSelector(selectLane,selectCall,selectRecall,selectSend,selectExit, (call, recall) => 
  ([...call, ...recall]
    .sort((a,b) => a.pool_number - b.pool_number))
)

export const selectAll = createSelector(selectLane,selectCall,selectRecall,selectSend,selectExit,selectGone, (lane, call, recall, send, exit, gone) => {
  const all = [...lane, ...call, ...recall, ...send, ...exit, ...gone]
  const sorted = all.sort((a,b) => a.sort.localeCompare(b.sort))
  return sorted;
})
