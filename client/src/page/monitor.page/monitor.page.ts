import { Component, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { carpoolSelectAll } from "../../store";
import { AsyncPipe } from "@angular/common";
import { PoolNumberComponent } from "../../component/pool-number.component/pool-number.component";

@Component({
    selector: 'car-monitor',
    imports: [AsyncPipe, PoolNumberComponent],
    templateUrl: 'monitor.page.html',
    styleUrl: 'monitor.page.scss'
})
export class MonitorPage {
    store = inject(Store)
    nums$ = this.store.select(carpoolSelectAll)
}