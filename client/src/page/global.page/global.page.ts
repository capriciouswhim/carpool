import { Component, inject, OnInit } from "@angular/core";
import { LanePage, DoorPage, RoomPage } from "../";
import { carpoolAction } from "../../store";
import { Store } from "@ngrx/store";

@Component({
  imports: [DoorPage, LanePage, RoomPage ],
  templateUrl: './global.page.html',
  styleUrl: './global.page.scss'
})
export class GlobalPage implements OnInit {
  store = inject(Store)
  
  ngOnInit(): void {
    setTimeout(() => this.store.dispatch(carpoolAction.get()),2000)
  }
}
