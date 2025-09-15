import { createFeature, createSelector } from "@ngrx/store";
import { carpoolReducer } from './carpool.reducer'
import { carpoolSource } from './carpool.state'

export const carpoolFeature = createFeature({
  name: carpoolSource,
  reducer: carpoolReducer
})

export const _selectLane = carpoolFeature.selectLane
export const _selectCall = carpoolFeature.selectCall
export const _selectRecall = carpoolFeature.selectRecall
export const _selectSend = carpoolFeature.selectSend
export const _selectExit = carpoolFeature.selectExit
export const _selectGone = carpoolFeature.selectGone

export const selectLane = createSelector(_selectLane, _selectExit, (lane, exit) => {
  return [
    ...[...lane].sort((a,b) => a.sort.localeCompare(b.sort)),
    ...[...exit].sort((a,b) => a.pool_number - b.pool_number)
  ]
})

export const selectDoor = createSelector(_selectLane, _selectCall, _selectRecall, _selectSend, (lane, call, recall, send) => {
  return [
    ...[
      ...lane,
      ...call,
      ...recall,
    ].sort((a,b) => a.lane_time.localeCompare(b.lane_time)),
    ...send.sort((a,b) => a.pool_number - b.pool_number)
  ]
})

export const selectRoom = createSelector(_selectCall, _selectRecall, (call, recall) => {
  return [
    ...call,
    ...recall    
  ].sort((a,b) => a.pool_number - b.pool_number)
})

export const selectEscort = createSelector(_selectExit, (exit) => {
  return [
    ...exit
  ].sort((a,b) => a.sort.localeCompare(b.sort))
})