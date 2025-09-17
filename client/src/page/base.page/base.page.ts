import { Component, inject, input, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { carpoolAction } from "../../store";
import { selectAll } from "../../store/carpool.feature";
import { TypedPoolNumber } from "../../model";
import { Marshal } from "../../model/marshal";

@Component({
    selector: 'car-base-page',
    template: ''
})
export class BasePage implements OnInit {
    store = inject(Store)
    poolNumbers$ = this.store.select(selectAll)
    marshal = inject(Marshal)

    ngOnInit(): void {
        this.store.dispatch(carpoolAction.poll())        
    }
}
