import { Component } from '@angular/core';
import { AnchorDirective } from '../../app/anchor.directive';

@Component({
  selector: 'car-test-page',
  imports: [AnchorDirective],
  templateUrl: './test.page.html',
  styleUrl: './test.page.scss'
})
export class TestPage {}
