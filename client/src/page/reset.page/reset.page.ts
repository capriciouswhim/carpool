import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { Store } from "@ngrx/store";
import { carpoolAction } from "../../store";

@Component({
    imports: [  MatButtonModule ],
    template: '<button mat-button (click)="onClick()">Reset</button>',
})
export class ResetPage {
    store = inject(Store)

    onClick() {
        this.store.dispatch(carpoolAction.reset())
    }
}