import { Component, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { carpoolSelectErrorMessage } from "../../store";
import { AsyncPipe } from "@angular/common";

@Component({
    selector: 'car-error',
    imports: [AsyncPipe],
    templateUrl: 'error.component.html',
    styleUrl: 'error.component.scss'
})
export class ErrorComponent {
    store = inject(Store)
    errorMessage$ = this.store.select(carpoolSelectErrorMessage);
}