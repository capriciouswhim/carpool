import { Component, inject, signal, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
// import { Store } from '@ngrx/store';
// import { carpoolAction } from '../../store/carpool.action';

@Component({
  encapsulation: ViewEncapsulation.ShadowDom,
  selector: 'car-keypad',
  imports: [ FormsModule, MatButtonModule, MatInputModule, MatSlideToggleModule ],
  templateUrl: './keypad.component.html',
  styleUrl: './keypad.component.scss'
})
export class KeypadComponent {
  // store = inject(Store)
  value = signal<number | null>(null)

  onBackspace() {
    const currentValue = this.value() ?? 0;
    if(currentValue) {
      const newValue = Math.floor(currentValue / 10)
      this.value.set(newValue !== 0 ? newValue : null)
    }
  }

  onClear() {
    this.value.set(null);
    // this.store.dispatch(carpoolAction.cls());
  }

  onDigit(keyValue: number) {
    this.value.set((this.value() ?? 0) * 10 + keyValue);
  }

  onEnter() {
    const currentValue = this.value() ?? 0;
    this.value.set(null);
    if(currentValue !== 0) {
      // this.store.dispatch(carpoolAction.add({ poolNumber: currentValue }))
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

  onToggle($event: any) {
    // this.store.dispatch(carpoolAction.togglePause());
  }
}
