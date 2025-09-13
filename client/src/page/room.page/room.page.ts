import { AsyncPipe } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { PoolNumberComponent } from "../../component";
import { selectAllCall } from "../../store/carpool.feature";
import { PoolNumber } from "../../model";
import { carpoolAction } from "../../store";
import { Store } from "@ngrx/store";

@Component({
  selector: 'car-room-page',
  imports: [ AsyncPipe, PoolNumberComponent ],
  templateUrl: './room.page.html',
  styleUrl: './room.page.scss'
})
export class RoomPage {
  store = inject(Store)
  poolNumbers$ = this.store.select(selectAllCall)

  onDblClick(poolNumberObj: PoolNumber) {
      const poolNumber = poolNumberObj.pool_number
      this.store.dispatch(carpoolAction.doorExit({ poolNumber }))
  }
}
