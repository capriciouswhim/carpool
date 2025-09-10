import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'lane', loadComponent: () => import('../page/lane.page/lane.page').then(m => m.LanePage) },
    { path: 'door', loadComponent: () => import('../page/door.page/door.page').then(m => m.DoorPage) },
    { path: 'room', loadComponent: () => import('../page/room.page/room.page').then(m => m.RoomPage) },
    { path: '', loadComponent: () => import('../page/landing.page/landing.page').then(m => m.LandingPage), pathMatch: 'full' }
];
