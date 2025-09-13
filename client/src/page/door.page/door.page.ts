import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { DispatchComponent, PoolNumberComponent } from '../../component';
import { carpoolAction, selectAll } from '../../store';
import { TypedPoolNumber } from '../../model';

@Component({
  selector: 'car-door-page',
  imports: [AsyncPipe, DispatchComponent, PoolNumberComponent],
  templateUrl: './door.page.html',
  styleUrl: './door.page.scss'
})
export class DoorPage {
  store = inject(Store)
  poolNumbers$ = this.store.select(selectAll)

  onDblClick(poolNumber: TypedPoolNumber) {
      switch(poolNumber.state) {
        case 'LANE':
          this.store.dispatch(carpoolAction.doorCallOne({ poolNumber: poolNumber.pool_number }))
          break;
        case 'CALL':
        case 'RECALL':
          this.store.dispatch(carpoolAction.doorCallOne({ poolNumber: poolNumber.pool_number }))
          break;
        case 'SEND':
          this.store.dispatch(carpoolAction.doorExit({ poolNumber: poolNumber.pool_number }))
          break;
      }
  }
}
