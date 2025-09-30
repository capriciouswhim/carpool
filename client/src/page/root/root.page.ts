import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'car-root',
  imports: [RouterOutlet],
  templateUrl: './root.page.html',
  styleUrl: './root.page.scss'
})
export class RootPage {
}
