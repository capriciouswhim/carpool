import { Component, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { carpoolSelectRoom } from "../../store";
import { AsyncPipe } from "@angular/common";
import { PoolNumberComponent } from "../../component/pool-number.component/pool-number.component";

@Component({
    selector: 'car-room',
    imports: [AsyncPipe, PoolNumberComponent],
    templateUrl: 'room.page.html',
    styleUrl: 'room.page.scss'
})
export class RoomPage {
    store = inject(Store)
    nums$ = this.store.select(carpoolSelectRoom)
}