import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'reset_', loadComponent: () => import('../page/reset.page/reset.page').then(m => m.ResetPage) },
    { path: 'door', loadComponent: () => import('../page/door.page/door.page').then(m => m.DoorPage) },
    { path: 'global', loadComponent: () => import('../page/global.page/global.page').then(m => m.GlobalPage) },
    { path: 'lane', loadComponent: () => import('../page/lane.page/lane.page').then(m => m.LanePage) },
    { path: 'room', loadComponent: () => import('../page/room.page/room.page').then(m => m.RoomPage) },
    { path: 'escort', loadComponent: () => import('../page/escort.page/escort.page').then(m => m.EscortPage) },
    { path: '', loadComponent: () => import('../page/landing.page/landing.page').then(m => m.LandingPage), pathMatch: 'full' }
];
