import { Component, inject, signal, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Store } from '@ngrx/store';
import { carpoolAction } from '../../store';
import { carpoolSelectCallImmediate } from '../../store';


@Component({
  selector: 'car-keypad',
  imports: [ FormsModule, MatButtonModule, MatInputModule, MatSlideToggleModule ],
  templateUrl: './keypad.component.html',
  styleUrl: './keypad.component.scss'
})
export class KeypadComponent {
  store = inject(Store)
  option = signal(false)
  value = signal<number | null>(null)

  constructor() {
      this.store.select(carpoolSelectCallImmediate).subscribe(o => {
      this.option.set(o)
      })
  }

  onBackspace() {
    const currentValue = this.value() ?? 0;
    if(currentValue) {
      const newValue = Math.floor(currentValue / 10)
      this.value.set(newValue !== 0 ? newValue : null)
    }
  }

  onReset() {
    // this.value.set(null);
    // this.store.dispatch(carpoolAction.reset());    
  }

  onClear() {
    // this.value.set(null);
    // this.store.dispatch(carpoolAction.resetLane());
  }

  onDigit(keyValue: number) {
    this.value.set((this.value() ?? 0) * 10 + keyValue);
  }

  onEnter() {
    const currentValue = this.value() ?? 0;
    this.value.set(null);
    if(currentValue !== 0) {
      this.store.dispatch(carpoolAction.add({ poolNumber: currentValue }))
    }
  }

  onButton(button: number | 'b' | 'e') {
    switch(button) {
      case 'b':
        this.onBackspace();
        break;
      case 'e':
        this.onEnter();
        break;
      case -1: // call all
        this.store.dispatch(carpoolAction.callAll())
        break;
      case -2: // call + 4
        this.store.dispatch(carpoolAction.callMany({ num: 4 }))
        break;
      case -3: // call auto
        this.store.dispatch(carpoolAction.setOptionCallImmediate({ option: !this.option() }))
        break;
      default:
        this.onDigit(button);
        break;
    }
  }

  onKeydown($event: KeyboardEvent) {
    const keyValue = Number.parseInt($event.key)
    $event.preventDefault();

    if(isNaN(keyValue)) {
      switch($event.key) {
        case 'Backspace':
          this.onBackspace();
          return;
        case 'Delete':
          this.onClear();
          break;
        case 'Enter':
          this.onEnter();
          break;
      }  
    } else {
      this.onDigit(keyValue);
    }
  }
}
