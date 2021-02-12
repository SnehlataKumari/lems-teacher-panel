import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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

const routes: Routes = [
  { path: 'add-test',component: AddTestComponent},
  { path: ':testId/edit-test',component: AddTestComponent},
  { path: ':testId/test-setting',component: TestSettingComponent},
  { path: ':testId/add-questions',component: AddQuestionsComponent},
  { path: ':testId/send-request',component: SendRequestComponent},
  { path: ':testId/add-manual',component: AddManualQuestionComponent},
  { path: ':testId/import-test',component: ImportTestComponent},
  { path: 'test',component: TestComponent}, 
  { path: 'request-approval',component: RequestApprovalComponent}, 
  { path: 'preview-instruction',component: TpreviewInstructionComponent}, 
  { path: ':testId/preview',component: TpreviewDetailsComponent}, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestRoutingModule { }
