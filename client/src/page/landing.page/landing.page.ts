import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule} from '@angular/material/input'
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';


@Component({
  selector: 'car-landing',
  imports: [
    FormsModule,
    MatButtonModule,
    MatInputModule
  ],
  templateUrl: './landing.page.html',
  styleUrl: './landing.page.scss'
})
export class LandingPage {
  private router = inject(Router)
  private store = inject(Store)

  protected readonly password = signal<string>('')

  onSubmit() {
    switch (this.password().toLocaleLowerCase()) {
      case 'lane':
        this.router.navigate(['/lane'], { skipLocationChange: true });
        break;
      case 'door':
        this.router.navigate(['/door'], { skipLocationChange: true });
        break;
      case 'escort':
        this.router.navigate(['/escort'], { skipLocationChange: true });
        break;
      case 'global':
        this.router.navigate(['/global'], { skipLocationChange: true });
        break;
      default:
        this.router.navigate(['/room'], { skipLocationChange: true });
        break;
    }
  }
}
