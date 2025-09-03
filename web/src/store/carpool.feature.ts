import { createFeature, createSelector } from "@ngrx/store";
import { carpoolReducer } from './carpool.reducer'
import { carpoolSource } from './carpool.state'

export const carpoolFeature = createFeature({
  name: carpoolSource,
  reducer: carpoolReducer
})

export const selectHistory = carpoolFeature.selectHistory
export const selectFuture = carpoolFeature.selectFuture
export const selectPaused = carpoolFeature.selectPaused

export const selectFutureHistory = createSelector(selectHistory, selectFuture, (h,f) => 
                                   [...h,...f].sort((a,b) => a.serialNumber-b.serialNumber))
