import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { LiveClassesComponent } from './live-classes.component';
import { AddLiveClassesComponent } from './add-live-classes/add-live-classes.component';
import { UpcomingClassesComponent } from './upcoming-classes/upcoming-classes.component';
import { ComplateClassesComponent } from './complate-classes/complate-classes.component';
import { ViewLiveClassDetailsComponent } from './view-live-class-details/view-live-class-details.component';
import { LiveClassBroadcastComponent } from 'src/app/shared/live-class-broadcast/live-class-broadcast.component';
import { NetlessWhiteboardComponent } from 'src/app/shared/netless-whiteboard/netless-whiteboard.component';

const routes: Routes = [
  { path: 'live-claas',component: LiveClassesComponent},
  { path: 'add-live-claas',component: AddLiveClassesComponent},
  { path: 'upcoming-classes',component: UpcomingClassesComponent},
  { path: 'complate-classes',component: ComplateClassesComponent},
  { path: ':liveClassId/view-live-class-details',component: ViewLiveClassDetailsComponent},
  { path: ':liveClassId/live-stream', component: LiveClassBroadcastComponent },
  { path: 'white-board', component: NetlessWhiteboardComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LiveClassesRoutingModule { }
