import { Component, input, output } from '@angular/core';
import { PoolNumber } from '../../model';

@Component({
  selector: 'car-pool-number',
  imports: [],
  templateUrl: './pool-number.component.html',
  styleUrl: './pool-number.component.scss'
})
export class PoolNumberComponent {
  poolNumber = input.required<PoolNumber>()
  click = output<PoolNumber>()

  onClick(poolNumber: PoolNumber) {
    this.click.emit(poolNumber);
  }
}
