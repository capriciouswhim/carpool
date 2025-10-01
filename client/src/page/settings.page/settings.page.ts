import { AsyncPipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button"
import { MatCardModule } from "@angular/material/card"
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatTooltipModule } from '@angular/material/tooltip';
import { Store } from "@ngrx/store";
import { selectOverscan } from "../../store/settings";
import { settingsAction } from "../../store/settings/settings.action";

@Component({
    selector: 'car-settings',
    imports: [AsyncPipe, MatButtonModule, MatCardModule, MatSlideToggleModule, MatTooltipModule],
    templateUrl: 'settings.page.html',
    styleUrl: 'settings.page.scss'
})
export class SettingsPage {
    store = inject(Store)
    overscan$ = this.store.select(selectOverscan);

    onToggleOverscan($event: MatSlideToggleChange) {
        this.store.dispatch(settingsAction.setOverscan({ value: $event.checked }))
    }
}