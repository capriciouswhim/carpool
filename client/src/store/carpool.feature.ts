import { createFeature, createSelector } from "@ngrx/store";
import { carpoolReducer } from './carpool.reducer'
import { carpoolSource } from './carpool.state'

export const carpoolFeature = createFeature({
  name: carpoolSource,
  reducer: carpoolReducer
})

export const selectLane = carpoolFeature.selectLane
export const selectCall = carpoolFeature.selectCall
export const selectRecall = carpoolFeature.selectRecall
export const selectSend = carpoolFeature.selectSend
export const selectExit = carpoolFeature.selectExit
export const selectGone = carpoolFeature.selectGone

export const selectAllCall = createSelector(selectCall, selectRecall, (call, recall) => 
  ([...call,...recall].sort((a,b) => a.pool_number - b.pool_number))
)

export const selectAllExit = createSelector(selectSend, selectExit, selectGone, (send, exit, gone) => 
  ([...send,...exit,...gone].sort((a,b) => a.pool_number - b.pool_number))
)

export const selectQueue = createSelector(selectLane,selectExit, (lane, exit) => {
  const all = [...lane, ...exit]
  const sorted = all.sort((a,b) => a.sort.localeCompare(b.sort))
  return sorted;
})

export const selectActive = createSelector(selectLane,selectCall,selectRecall,selectSend,selectExit, (lane, call, recall, send, exit) => {
  const all = [...lane, ...call, ...recall, ...send, ...exit]
  const sorted = all.sort((a,b) => a.sort.localeCompare(b.sort))
  return sorted;
})


export const selectAll = createSelector(selectLane,selectCall,selectRecall,selectSend,selectExit,selectGone, (lane, call, recall, send, exit, gone) => {
  const all = [...lane, ...call, ...recall, ...send, ...exit, ...gone]
  const sorted = all.sort((a,b) => a.sort.localeCompare(b.sort))
  return sorted;
})
