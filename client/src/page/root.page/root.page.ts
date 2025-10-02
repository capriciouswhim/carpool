import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent, VersionComponent } from '../../component';
import { ErrorComponent } from "../../component/error.component/error.component";
import { Store } from '@ngrx/store';
import { settingsSelectOverscan } from '../../store';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'car-root',
  imports: [AsyncPipe, ErrorComponent, HeaderComponent, RouterOutlet, VersionComponent],
  templateUrl: './root.page.html',
  styleUrl: './root.page.scss'
})
export class RootPage {
  store = inject(Store)
  overscan$ = this.store.select(settingsSelectOverscan)
}
