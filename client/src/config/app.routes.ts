import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'lane', loadComponent: () => import('../page/lane.page/lane.page').then(m => m.LanePage) },
    { path: 'door', loadComponent: () => import('../page/door.page/door.page').then(m => m.DoorPage) },
    { path: 'room', loadComponent: () => import('../page/room.page/room.page').then(m => m.RoomPage) },
    { path: 'settings', loadComponent: () => import('../page/settings.page/settings.page').then(m => m.SettingsPage) },
    { path: 'test', loadComponent: () => import('../page/test.page/test.page').then(m => m.TestPage) },
    { path: '', redirectTo: 'monitor', pathMatch: 'full' }
]
