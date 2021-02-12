import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
import { LoggedInService } from './services/logged-in.service';


const routes: Routes = [
  {
    path: '',
    canActivate: [LoggedInService],
    loadChildren: () => import('./shared/shared.module').then(mod => mod.SharedModule)
  },
  {
    path: 'home',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./layout/dashboard/dashboard.module').then(mod => mod.DashboardModule)
  }, 
  {
    path: 'test',
    loadChildren: () => import('./layout/test/test.module').then(mod => mod.TestModule)
  }, 
  {
    path: 'live-class',
    loadChildren: () => import('./layout/live-classes/live-classes.module').then(mod => mod.LiveClassesModule)
  }, 
  {
    path: 'batches',
    loadChildren: () => import('./layout/batches/batches.module').then(mod => mod.BatchesModule)
  }, 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
