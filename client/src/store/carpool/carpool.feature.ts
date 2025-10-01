import { createFeature, createSelector } from "@ngrx/store";
import { carpoolReducer } from './carpool.reducer'
import { carpoolSource } from './carpool.state'
import { TypedPoolNumber } from "../../model";

export const carpoolFeature = createFeature({
  name: carpoolSource,
  reducer: carpoolReducer
})

function laneOrder(poolNumbers: TypedPoolNumber[]) {
  return [...poolNumbers].sort((a,b) => a.sort.localeCompare(b.sort))
}

function numericOrder(poolNumbers: TypedPoolNumber[]) {
  return [...poolNumbers].sort((a,b) => a.pool_number - b.pool_number)
}

export const selectHaveData = createSelector(carpoolFeature.selectCarpoolState, state => {
  return 0 < (state.lane.length + state.call.length + state.recall.length + state.send.length + state.exit.length + state.gone.length)
})

export const selectAll = createSelector(carpoolFeature.selectCarpoolState, state => {
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

// export const _selectLane = carpoolFeature.selectLane
// export const _selectCall = carpoolFeature.selectCall
// export const _selectRecall = carpoolFeature.selectRecall
// export const _selectSend = carpoolFeature.selectSend
// export const _selectExit = carpoolFeature.selectExit
// export const _selectGone = carpoolFeature.selectGone
export const selectCallImmediate = carpoolFeature.selectCallImmediate
export const selectErrorMessage = carpoolFeature.selectErrorMessage

// export const selectAll = createSelector(
//   _selectLane,
//   _selectCall,
//   _selectRecall,
//   _selectSend,
//   _selectExit,
//   _selectGone,
//   (l,c,r,s,e,g) => {
//     return [
//       ...[
//         ...l,
//         ...c,
//         ...r
//       ].sort((a,b) => a.sort.localeCompare(b.sort)),
//       ...[
//         ...s,
//         ...e
//       ].sort((a,b) => a.pool_number - b.pool_number),
//       ...[
//         ...g
//       ].sort((a,b) => a.pool_number - b.pool_number),
//     ]
//   }
// )

// export const selectExit = createSelector(
//   _selectLane,
//   _selectCall,
//   _selectRecall,
//   _selectSend,
//   _selectExit,
//   _selectGone,
//   (l,c,r,s,e,g) => {
//     return [
//       ...[
//         ...l,
//         ...c,
//         ...r
//       ].sort((a,b) => a.pool_number - b.pool_number),
//       ...[
//         ...s,
//         ...e
//       ].sort((a,b) => a.pool_number - b.pool_number),
//       ...[
//         ...g
//       ].sort((a,b) => a.pool_number - b.pool_number),
//     ]
//   }
// )

// export const selectLane = createSelector(_selectLane, _selectExit, (lane, exit) => {
//   return [
//     ...[...lane].sort((a,b) => a.sort.localeCompare(b.sort)),
//     ...[...exit].sort((a,b) => a.pool_number - b.pool_number)
//   ]
// })

// export const selectDoor = createSelector(_selectLane, _selectCall, _selectRecall, _selectSend, _selectExit, (lane, call, recall, send, exit) => {
//   return [
//     ...[
//       ...lane,
//       ...call,
//       ...recall,
//     ].sort((a,b) => a.lane_time.localeCompare(b.lane_time)),
//     ...[
//       ...send,
//       ...exit
//     ].sort((a,b) => a.pool_number - b.pool_number)
//   ]
// })

// export const selectRoom = createSelector(
//   _selectLane,
//   _selectCall,
//   _selectRecall,
//   _selectSend,
//   _selectExit,
//   _selectGone,
//   (l,c,r,s,e,g) => {
//     return [
//       ...[
//         ...c,
//         ...r
//       ].sort((a,b) => a.pool_number - b.pool_number),
//       // ...[
//       //   ...s,
//       // ].sort((a,b) => a.pool_number - b.pool_number),
//     ]
//   }
// )

// export const selectEscort = createSelector(
//   _selectLane,
//   _selectCall,
//   _selectRecall,
//   _selectSend,
//   _selectExit,
//   _selectGone,
//   (l,c,r,s,e,g) => {
//     return [
//       ...[
//         ...l,
//         ...c,
//         ...r
//       ].sort((a,b) => a.pool_number - b.pool_number),
//       ...[
//         ...s,
//         ...e
//       ].sort((a,b) => a.pool_number - b.pool_number),
//       ...[
//         ...g
//       ].sort((a,b) => a.pool_number - b.pool_number),
//     ]
//   }
// )
