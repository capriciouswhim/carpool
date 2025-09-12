import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent, VersionComponent } from '../component';
import { TestPage } from "../page/test.page/test.page";

@Component({
  selector: 'app-root',
  imports: [ HeaderComponent, RouterOutlet, VersionComponent ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
}
