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
