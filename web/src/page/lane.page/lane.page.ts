import { Component, inject, OnInit } from '@angular/core';
import { KeypadComponent, PoolNumberComponent } from '../../component';
import { Store } from '@ngrx/store';
import { selectFutureHistory } from '../../store/carpool.feature';
import { AsyncPipe } from '@angular/common';
import { carpoolAction } from '../../store';
import { PoolNumber } from '../../model';

@Component({
  selector: 'car-lane',
  imports: [AsyncPipe, KeypadComponent, PoolNumberComponent],
  templateUrl: './lane.page.html',
  styleUrl: './lane.page.scss'
})
export class LanePage implements OnInit {
  store = inject(Store)
  futureHistory$ = this.store.select(selectFutureHistory)

  ngOnInit() {
    this.store.dispatch(carpoolAction.fetch())
  }

  onClick(poolNumber: PoolNumber) {
      this.store.dispatch(carpoolAction.rem({ poolNumber: poolNumber.poolNumber }))
  }
}
