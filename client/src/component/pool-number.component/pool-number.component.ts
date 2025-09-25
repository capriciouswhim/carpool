import { Component, input, InputSignal, output } from '@angular/core';
import { TypedPoolNumber } from '../../model';

@Component({
  selector: 'car-pool-number',
  imports: [],
  templateUrl: './pool-number.component.html',
  styleUrl: './pool-number.component.scss'
})
export class PoolNumberComponent {
  showLabel = input<boolean>(true)
  poolNumber = input.required<TypedPoolNumber>()
  invoke = output<TypedPoolNumber>()

  getClass = (poolNumberSignal: InputSignal<TypedPoolNumber>) => {
    const poolNumber = poolNumberSignal()
    let result
    switch(poolNumberSignal().state) {
      case 'LANE':
        result = { lane: true }
        break;
      case 'CALL':
        result = { call: true }
        break;
      case 'RECALL':
        result = { recall: true }
        break;
      case 'SEND':
        result = { send: true }
        break;
      case 'EXIT':
        result = { exit: true }
        break;
      case 'GONE':
        result = { gone: true }
        break;
    }
    
    return {
      showlabel: this.showLabel(),
      ...result
    }
  }

  getHumanLabel = (poolNumberSignal: InputSignal<TypedPoolNumber>) => {
    if(!this.showLabel()) {
      return ''
    }

    const poolNumber = poolNumberSignal()
    switch(poolNumberSignal().state) {
      case 'LANE': return 'Car Has Arrived'
      case 'CALL': return 'Number Called'
      case 'RECALL': return 'Number Called Again'
      case 'SEND': return 'Student Sent To Door'
      case 'EXIT': return 'Student Is Outside'
      case 'GONE': return 'Car Has Left'
    }
  }

  onDblClick($event: MouseEvent) {
    $event.preventDefault()
    this.invoke.emit(this.poolNumber());
  }
}
