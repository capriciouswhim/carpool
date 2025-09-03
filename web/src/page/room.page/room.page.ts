import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectHistory } from '../../store/carpool.feature';
import { AsyncPipe } from '@angular/common';
import { PoolNumberComponent } from '../../component';
import { carpoolAction } from '../../store';
import { PoolNumber } from '../../model';

@Component({
  selector: 'car-room',
  imports: [ AsyncPipe, PoolNumberComponent ],
  templateUrl: './room.page.html',
  styleUrl: './room.page.scss'
})
export class RoomPage implements OnInit {
  store = inject(Store)
  history$ = this.store.select(selectHistory);

  ngOnInit() {
    this.store.dispatch(carpoolAction.fetch())
  }

  onClick(poolNumber: PoolNumber) {
      this.store.dispatch(carpoolAction.rel({ poolNumber: poolNumber.poolNumber }))
  }
}
