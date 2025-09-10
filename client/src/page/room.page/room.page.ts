import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCall, selectRecall } from '../../store/carpool.feature';
import { AsyncPipe } from '@angular/common';
import { PoolNumberComponent } from '../../component';
import { carpoolAction } from '../../store';
import { PoolNumber } from '../../model'

@Component({
  selector: 'car-room',
  imports: [ AsyncPipe, PoolNumberComponent ],
  templateUrl: './room.page.html',
  styleUrl: './room.page.scss'
})
export class RoomPage implements OnInit {
  store = inject(Store)
  call$ = this.store.select(selectCall);
  recall$ = this.store.select(selectRecall);

  ngOnInit() {
    this.store.dispatch(carpoolAction.get())
  }

  onClick(poolNumberObj: PoolNumber) {
      const poolNumber = poolNumberObj.pool_number
      this.store.dispatch(carpoolAction.roomSend({ poolNumber }))
  }
}
