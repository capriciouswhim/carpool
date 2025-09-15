import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { DispatchComponent, PoolNumberComponent } from '../../component';
import { carpoolAction, selectDoor } from '../../store';
import { TypedPoolNumber } from '../../model';
import { BasePage } from '../base.page/base.page';

@Component({
  selector: 'car-door-page',
  imports: [ AsyncPipe, PoolNumberComponent, DispatchComponent ],
  templateUrl: './door.page.html',
  styleUrl: './door.page.scss'
})
export class DoorPage extends BasePage {
  poolNumbers$ = this.store.select(selectDoor)

  onInvoke(poolNumber: TypedPoolNumber) {
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
      case 'EXIT':
        this.store.dispatch(carpoolAction.escortGone({ poolNumber: poolNumber.pool_number }))
        break;
    }
  }
}
