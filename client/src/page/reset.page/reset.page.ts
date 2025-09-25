import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { PoolNumberComponent } from '../../component';
import { BasePage } from '../base.page/base.page';
import { TypedPoolNumber } from '../../model';
import { MatButtonModule } from '@angular/material/button';
import { carpoolAction } from '../../store';

@Component({
  selector: 'car-reset-page',
  imports: [AsyncPipe, MatButtonModule, PoolNumberComponent],
  templateUrl: './reset.page.html',
  styleUrl: './reset.page.scss'
})
export class ResetPage extends BasePage {

  onClick = () =>
    this.store.dispatch(carpoolAction.reset())

}
