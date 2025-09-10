import { Component, input, output } from '@angular/core';
import { PoolNumber } from '../../model';

type NumberState = 'LANE' | 'CALL' | 'RECALL' | 'SEND' | 'EXIT'

@Component({
  selector: 'car-pool-number',
  imports: [],
  templateUrl: './pool-number.component.html',
  styleUrl: './pool-number.component.scss'
})
export class PoolNumberComponent {
  poolNumber = input.required<PoolNumber>()
  state = input.required<NumberState>()
  click = output<PoolNumber>()

  getClass = () => ({
    lane: this.state() === 'LANE',
    call: this.state() === 'CALL',
    recall: this.state() === 'RECALL',
    send: this.state() === 'SEND',
    exit: this.state() === 'EXIT',
  })

  onClick() {
    this.click.emit(this.poolNumber());
  }
}
