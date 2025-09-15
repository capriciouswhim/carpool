import { Component, input, InputSignal, output } from '@angular/core';
import { TypedPoolNumber } from '../../model';

@Component({
  selector: 'car-pool-number',
  imports: [],
  templateUrl: './pool-number.component.html',
  styleUrl: './pool-number.component.scss'
})
export class PoolNumberComponent {
  poolNumber = input.required<TypedPoolNumber>()
  invoke = output<TypedPoolNumber>()

  getClass = (poolNumberSignal: InputSignal<TypedPoolNumber>) => {
    const poolNumber = poolNumberSignal()
    switch(poolNumberSignal().state) {
      case 'LANE': return { lane: true }
      case 'CALL': return { call: true }
      case 'RECALL': return { recall: true }
      case 'SEND': return { send: true }
      case 'EXIT': return { exit: true }
      case 'GONE': return { gone: true }
    }
  }

  onDblClick($event: MouseEvent) {
    $event.preventDefault()
    this.invoke.emit(this.poolNumber());
  }
}
