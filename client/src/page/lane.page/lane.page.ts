import { Component, inject } from "@angular/core";
import { KeypadComponent } from "../../component";
import { Store } from "@ngrx/store";
import { carpoolSelectLane, settingsSelectSinistral } from "../../store";
import { AsyncPipe } from "@angular/common";
import { PoolNumberComponent } from "../../component";

@Component({
    selector: 'car-lane',
    imports: [AsyncPipe,KeypadComponent,PoolNumberComponent],
    templateUrl: 'lane.page.html',
    styleUrl: 'lane.page.scss'
})
export class LanePage {
    store = inject(Store)
    nums$ = this.store.select(carpoolSelectLane)
    sinistral$ = this.store.select(settingsSelectSinistral)
}