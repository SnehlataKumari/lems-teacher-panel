import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavModule } from '../nav/nav.module';
import { MatModuleModule } from '../../mat-module.module';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

import { TestRoutingModule } from './test-routing.module';
import { AddTestComponent } from './add-test/add-test.component';
import { TestSettingComponent } from './test-setting/test-setting.component';
import { AddQuestionsComponent } from './add-questions/add-questions.component';
import { SendRequestComponent } from './send-request/send-request.component';
import { AddManualQuestionComponent } from './add-manual-question/add-manual-question.component';
import { ImportTestComponent } from './import-test/import-test.component';
import { TestComponent } from './test.component';
import { RequestApprovalComponent } from './request-approval/request-approval.component';
import { TpreviewInstructionComponent } from './tpreview-instruction/tpreview-instruction.component';
import { TpreviewDetailsComponent } from './tpreview-details/tpreview-details.component';


@NgModule({
  declarations: [AddTestComponent, TestSettingComponent, AddQuestionsComponent, SendRequestComponent, AddManualQuestionComponent, ImportTestComponent, TestComponent, RequestApprovalComponent, TpreviewInstructionComponent, TpreviewDetailsComponent],
  imports: [
    CommonModule,
    TestRoutingModule,
    NavModule,
    MatModuleModule,
    NgxMaterialTimepickerModule
  ]
})
export class TestModule { }
