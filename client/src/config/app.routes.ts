import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('../page/test.page/test.page').then(m => m.TestPage), pathMatch: 'full' }
];
