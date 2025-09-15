import { Component, inject, OnInit } from "@angular/core";
import { LanePage, DoorPage, RoomPage, EscortPage } from "../";
import { BasePage } from "../base.page/base.page";

@Component({
  imports: [DoorPage, LanePage, RoomPage, EscortPage ],
  templateUrl: './global.page.html',
  styleUrl: './global.page.scss'
})
export class GlobalPage extends BasePage {}
