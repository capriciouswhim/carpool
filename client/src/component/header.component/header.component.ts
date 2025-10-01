import { Component } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from "@angular/material/icon";
import { GoogleComponent } from '../google.component/google.component';

@Component({
  selector: 'car-header',
  imports: [GoogleComponent, MatButtonModule, MatIconModule, MatToolbarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  readonly data_client_id="645008399704-qqnqru9a5ivoaus70nqg8nihucn2qruq.apps.googleusercontent.com"

  ngAfterViewInit() {
    const element = window.document.getElementById('g_id_onload')
    element?.setAttribute('data-client_id', this.data_client_id)
  }
}
