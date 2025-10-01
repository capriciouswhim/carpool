import { AsyncPipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Store } from "@ngrx/store";
import { selectHaveData, selectOverscan } from "../../store/feature";
import { actions } from "../../store/actions";

@Component({
    selector: 'car-settings',
    imports: [AsyncPipe, MatButtonModule, MatCardModule, MatIconModule, MatSlideToggleModule, MatTooltipModule],
    templateUrl: 'settings.page.html',
    styleUrl: 'settings.page.scss'
})
export class SettingsPage {
    store = inject(Store)
    haveData$ = this.store.select(selectHaveData)
    overscan$ = this.store.select(selectOverscan);

    onToggleOverscan($event: MatSlideToggleChange) {
        this.store.dispatch(actions.setOverscan({ value: $event.checked }))
    }

    async onResetToday() {
        this.store.dispatch(actions.reset())
    }
}