import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { PoolNumberComponent } from '../../component';
import { TypedPoolNumber } from '../../model';
import { BasePage } from '../../page';
import { selectRoom } from '../../store';

@Component({
  selector: 'car-room-page',
  imports: [ AsyncPipe, PoolNumberComponent ],
  templateUrl: './room.page.html',
  styleUrl: './room.page.scss'
})
export class RoomPage extends BasePage {
  override poolNumbers$ = this.store.select(selectRoom)
  
  onInvoke = (poolNumber: TypedPoolNumber) =>
    this.store.dispatch(this.marshal.nextStep('ESCORT', poolNumber))

}
