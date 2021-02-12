import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BatchesComponent } from './batches.component';
import { ViewBatchesComponent } from './view-batches/view-batches.component';
import { FaqComponent } from './faq/faq.component';
import { ReportsComponent } from './reports/reports.component';
import { StudentReportsComponent } from './student-reports/student-reports.component';
import { DoubtReportsComponent } from './doubt-reports/doubt-reports.component';
import { ProgressReportsComponent } from './progress-reports/progress-reports.component';
import { ReportDetailsComponent } from './report-details/report-details.component';

const routes: Routes = [
  { path: 'batches',component: BatchesComponent},
  { path: 'view-batches',component: ViewBatchesComponent},
  { path: 'faq',component: FaqComponent},
  { path: 'reports',component: ReportsComponent},
  { path: 'student-report',component: StudentReportsComponent},
  { path: 'doubt-report',component: DoubtReportsComponent},
  { path: 'progress-report',component: ProgressReportsComponent},
  { path: 'report-details',component: ReportDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BatchesRoutingModule { }
