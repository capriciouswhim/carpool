import { Routes } from '@angular/router';
import { DoorPage, GymPage, LandingPage, LanePage, RoomPage } from '../page';

export const routes: Routes = [
    { path: 'door', component: DoorPage },
    { path: 'gym', component: GymPage },
    { path: 'lane', component: LanePage },
    { path: 'room', component: RoomPage },
    { path: '', component: LandingPage, pathMatch: 'full' }
];
