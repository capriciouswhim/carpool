import { Component, inject, OnInit } from '@angular/core';
import { KeypadComponent, PoolNumberComponent } from '../../component';
import { Store } from '@ngrx/store';
import { selectLane } from '../../store/carpool.feature';
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
  lane$ = this.store.select(selectLane)

  ngOnInit() {
    this.store.dispatch(carpoolAction.get())
  }

  onClick(poolNumberObj: PoolNumber) {
      const poolNumber = poolNumberObj.pool_number
      this.store.dispatch(carpoolAction.laneDel({ poolNumber }))
  }
}
