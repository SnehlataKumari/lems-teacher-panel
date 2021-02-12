import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { HelpSupportComponent } from './help-support/help-support.component';
import { ApplyLeaveComponent } from './apply-leave/apply-leave.component';
import { AssignedStudentComponent } from './assigned-student/assigned-student.component';
import { LiveChatSupportComponent } from 'src/app/layout/dashboard/live-chat-support/live-chat-support.component';

const routes: Routes = [
  { path: 'dashboard',component: DashboardComponent},
  { path: 'profile',component: ProfileComponent},
  { path: 'help-support',component: HelpSupportComponent},
  { path: 'apply-leave',component: ApplyLeaveComponent},
  { path: 'assign-student',component: AssignedStudentComponent},
  {path: 'live-chat-support', component: LiveChatSupportComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
