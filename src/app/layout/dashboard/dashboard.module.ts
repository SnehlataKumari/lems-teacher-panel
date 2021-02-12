import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavModule } from '../nav/nav.module';
import { MatModuleModule } from '../../mat-module.module';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

import { ChartsModule } from 'ng2-charts';
import { NgChatModule } from 'ng-chat';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { HelpSupportComponent } from './help-support/help-support.component';
import { ApplyLeaveComponent } from './apply-leave/apply-leave.component';
import { AssignedStudentComponent } from './assigned-student/assigned-student.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LiveChatSupportComponent } from './live-chat-support/live-chat-support.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ProfileComponent,
    HelpSupportComponent,
    ApplyLeaveComponent,
    AssignedStudentComponent,
    LiveChatSupportComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NavModule,
    ChartsModule,
    MatModuleModule,
    NgxMaterialTimepickerModule,
    SharedModule,
    NgChatModule,
  ],
})
export class DashboardModule {}
