import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { PoolNumberComponent } from '../../component';
import { carpoolAction, selectExit } from '../../store';
import { TypedPoolNumber } from '../../model';
import { selectAllExit } from '../../store/carpool.feature';

@Component({
  selector: 'car-escort-page',
  imports: [AsyncPipe, PoolNumberComponent],
  templateUrl: './escort.page.html',
  styleUrl: './escort.page.scss'
})
export class EscortPage {
  store = inject(Store)
  poolNumbers$ = this.store.select(selectAllExit)

  onDblClick(poolNumber: TypedPoolNumber) {
      switch(poolNumber.state) {
        case 'EXIT':
          this.store.dispatch(carpoolAction.escortGone({ poolNumber: poolNumber.pool_number }))
          break;
      }
  }
}
