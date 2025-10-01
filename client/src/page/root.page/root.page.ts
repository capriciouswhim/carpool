import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent, VersionComponent } from '../../component';
import { ErrorComponent } from "../../component/error.component/error.component";

@Component({
  selector: 'car-root',
  imports: [ErrorComponent, HeaderComponent, RouterOutlet, VersionComponent],
  templateUrl: './root.page.html',
  styleUrl: './root.page.scss'
})
export class RootPage {
}
