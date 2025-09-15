import { Component, inject, input, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { carpoolAction } from "../../store";

@Component({
    selector: 'car-base-page',
    template: ''
})
export class BasePage implements OnInit {
    delegate = input(false)
    store = inject(Store)

    ngOnInit(): void {
        if(!this.delegate()) {
            setInterval(() => this.store.dispatch(carpoolAction.get()), 2000)
        }
    }
}