import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterModule } from '@angular/router';
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from '@angular/material/menu'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from "@angular/material/icon";
import { filter } from 'rxjs';

@Component({
  selector: 'car-header',
  imports: [MatButtonModule, MatIconModule, MatMenuModule, MatToolbarModule, RouterLink, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  router = inject(Router)
  title = signal('Carpool')

  constructor() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        switch(event.urlAfterRedirects) {
          case '/arrivals':
            this.title.set('Arrivals')
            break;
          case '/departures':
            this.title.set('Departures')
            break;
          case '/settings':
            this.title.set('Settings')
            break;
          default:
            this.title.set('Carpool')
        }
      })
  }

  eggs = signal<number[]>([]);
  egg() {
    this.eggs.set([0])
  }

  onEgg() {
    this.eggs.set([])
    this.router.navigateByUrl('/test')
  }
}
