import { AsyncPipe } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { PoolNumberComponent } from "../../component";
import { PoolNumber } from "../../model";
import { carpoolAction, selectRoom } from "../../store";
import { Store } from "@ngrx/store";
import { BasePage } from "../base.page/base.page";

@Component({
  selector: 'car-room-page',
  imports: [ AsyncPipe, PoolNumberComponent ],
  templateUrl: './room.page.html',
  styleUrl: './room.page.scss'
})
export class RoomPage extends BasePage {
  poolNumbers$ = this.store.select(selectRoom)

  onInvoke(poolNumberObj: PoolNumber) {
      const poolNumber = poolNumberObj.pool_number
      this.store.dispatch(carpoolAction.roomSend({ poolNumber }))
  }
}
