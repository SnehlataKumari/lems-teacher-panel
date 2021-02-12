import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavModule } from '../nav/nav.module';
import { MatModuleModule } from '../../mat-module.module';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

import { LiveClassesRoutingModule } from './live-classes-routing.module';
import { LiveClassesComponent } from './live-classes.component';
import { AddLiveClassesComponent } from './add-live-classes/add-live-classes.component';
import { UpcomingClassesComponent } from './upcoming-classes/upcoming-classes.component';
import { ComplateClassesComponent } from './complate-classes/complate-classes.component';
import { ViewLiveClassDetailsComponent } from './view-live-class-details/view-live-class-details.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [LiveClassesComponent, AddLiveClassesComponent, UpcomingClassesComponent, ComplateClassesComponent, ViewLiveClassDetailsComponent],
  imports: [
    CommonModule,
    LiveClassesRoutingModule,
    NavModule,
    MatModuleModule,
    NgxMaterialTimepickerModule,
    SharedModule
  ]
})
export class LiveClassesModule { }
