import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'arrivals', loadComponent: () => import('../page/arrivals.page/arrivals.page').then(m => m.ArrivalsPage) },
    { path: 'departures', loadComponent: () => import('../page/departures.page/departures.page').then(m => m.DeparturesPage) },
    { path: 'monitor', loadComponent: () => import('../page/monitor.page/monitor.page').then(m => m.MonitorPage) },
    { path: 'room', redirectTo: 'monitor' }, // Backwards Compatibility (TODO Deprecate in v3.7)
    { path: 'settings', loadComponent: () => import('../page/settings.page/settings.page').then(m => m.SettingsPage) },
    { path: 'test', loadComponent: () => import('../page/test.page/test.page').then(m => m.TestPage) },
    { path: '', redirectTo: 'monitor', pathMatch: 'full' }
]
