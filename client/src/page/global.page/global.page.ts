import { Component} from "@angular/core";
import { LanePage, DoorPage, EscortPage } from "../";

@Component({
  imports: [DoorPage, LanePage, EscortPage ],
  templateUrl: './global.page.html',
  styleUrl: './global.page.scss'
})
export class GlobalPage {
}
