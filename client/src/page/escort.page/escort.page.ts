import { Component, inject, input, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { PoolNumberComponent } from '../../component';
import { carpoolAction, selectEscort } from '../../store';
import { TypedPoolNumber } from '../../model';
import { BasePage } from '../base.page/base.page';

@Component({
  selector: 'car-escort-page',
  imports: [AsyncPipe, PoolNumberComponent],
  templateUrl: './escort.page.html',
  styleUrl: './escort.page.scss'
})
export class EscortPage extends BasePage {
  poolNumbers$ = this.store.select(selectEscort)

  onInvoke(poolNumber: TypedPoolNumber) {
    switch (poolNumber.state) {
      case 'EXIT':
        this.store.dispatch(carpoolAction.escortGone({ poolNumber: poolNumber.pool_number }))
        break;
    }
  }
}
