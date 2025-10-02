import { AsyncPipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Store } from "@ngrx/store";
import { carpoolAction, carpoolSelectHaveData, settingsAction, settingsSelectSinistral } from "../../store";
import { settingsSelectOverscan } from "../../store";

@Component({
    selector: 'car-settings',
    imports: [AsyncPipe, MatButtonModule, MatCardModule, MatIconModule, MatSlideToggleModule, MatTooltipModule],
    templateUrl: 'settings.page.html',
    styleUrl: 'settings.page.scss'
})
export class SettingsPage {
    store = inject(Store)
    haveData$ = this.store.select(carpoolSelectHaveData)
    overscan$ = this.store.select(settingsSelectOverscan)
    sinistral$ = this.store.select(settingsSelectSinistral)


    onToggleSinistral($event: MatSlideToggleChange) {
        this.store.dispatch(settingsAction.setSinistral({ value: $event.checked }))
    }

    onToggleOverscan($event: MatSlideToggleChange) {
        this.store.dispatch(settingsAction.setOverscan({ value: $event.checked }))
    }

    async onResetToday() {
        this.store.dispatch(carpoolAction.reset())
    }
}