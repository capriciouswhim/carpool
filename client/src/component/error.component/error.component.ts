import { Component, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { AsyncPipe } from "@angular/common";
import { selectErrorMessage } from "../../store/feature";

@Component({
    selector: 'car-error',
    imports: [AsyncPipe],
    templateUrl: 'error.component.html',
    styleUrl: 'error.component.scss'
})
export class ErrorComponent {
    store = inject(Store)
    errorMessage$ = this.store.select(selectErrorMessage);
}