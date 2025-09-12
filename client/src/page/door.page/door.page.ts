import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { KeypadComponent, PoolNumberComponent } from '../../component';
import { carpoolAction, selectAll } from '../../store';
import { PoolNumber } from '../../model';

@Component({
  selector: 'car-door-page',
  imports: [AsyncPipe, PoolNumberComponent],
  templateUrl: './door.page.html',
  styleUrl: './door.page.scss'
})
export class DoorPage {
  store = inject(Store)
  poolNumbers$ = this.store.select(selectAll)

  onDblClick(poolNumberObj: PoolNumber) {
      const poolNumber = poolNumberObj.pool_number
      this.store.dispatch(carpoolAction.doorCallOne({ poolNumber }))
  }
}
