import { Component, inject, signal, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { carpoolAction, carpoolSelectCallImmediate } from '../../store';

@Component({
  selector: 'car-dispatch',
  imports: [ MatButtonModule ],
  templateUrl: './dispatch.component.html',
  styleUrl: './dispatch.component.scss'
})
export class DispatchComponent {
  store = inject(Store)
  option = signal(false)
  value = signal<number | null>(null)

  constructor() {
     this.store.select(carpoolSelectCallImmediate).subscribe(o => {
      this.option.set(o)
     })
  }

  onButton(button: number) {
    switch(button) {
      case -1:
        this.store.dispatch(carpoolAction.callAll())
        break;

      case 4:
        this.store.dispatch(carpoolAction.callMany({ num: 4 }))
        break;

      case 0:
        this.store.dispatch(carpoolAction.setOptionCallImmediate({ option: !this.option() }))
        break;
    }
  }
}
