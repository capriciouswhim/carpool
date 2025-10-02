import { Component, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { carpoolSelectDoor } from "../../store";
import { AsyncPipe } from "@angular/common";
import { DispatchComponent, PoolNumberComponent } from "../../component";

@Component({
    selector: 'car-door',
    imports: [AsyncPipe,DispatchComponent,PoolNumberComponent],
    templateUrl: 'door.page.html',
    styleUrl: 'door.page.scss'
})
export class DoorPage {
    store = inject(Store)
    nums$ = this.store.select(carpoolSelectDoor)
}