import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavModule } from '../nav/nav.module';
import { MatModuleModule } from '../../mat-module.module';
import { BatchesRoutingModule } from './batches-routing.module';
import { BatchesComponent } from './batches.component';
import { ViewBatchesComponent } from './view-batches/view-batches.component';
import { FaqComponent } from './faq/faq.component';
import { ReportsComponent } from './reports/reports.component';
import { StudentReportsComponent } from './student-reports/student-reports.component';
import { DoubtReportsComponent } from './doubt-reports/doubt-reports.component';
import { ProgressReportsComponent } from './progress-reports/progress-reports.component';
import { ReportDetailsComponent } from './report-details/report-details.component';


@NgModule({
  declarations: [BatchesComponent, ViewBatchesComponent, FaqComponent, ReportsComponent, StudentReportsComponent, DoubtReportsComponent, ProgressReportsComponent, ReportDetailsComponent],
  imports: [
    CommonModule,
    BatchesRoutingModule,
    NavModule,
    MatModuleModule
  ]
})
export class BatchesModule { }
