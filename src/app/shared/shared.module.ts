import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatModuleModule } from '../mat-module.module';
import { SharedRoutingModule } from './shared-routing.module';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RegistrationComponent } from './registration/registration.component';
import { CustomCheckboxFieldComponent } from './custom-checkbox-field/custom-checkbox-field.component';
import { CustomCheckboxFormgroupComponent } from './custom-checkbox-formgroup/custom-checkbox-formgroup.component';
import { FileFieldComponent } from './file-field/file-field.component';
import { CustomPasswordComponent } from './custom-password/custom-password.component';
import { OtpComponent } from './otp/otp.component';
import { ShowErrorsComponent } from './show-errors/show-errors.component';
import { ClassesComponent } from './classes/classes.component';
import { LiveClassBroadcastComponent } from './live-class-broadcast/live-class-broadcast.component';
import { NetlessWhiteboardComponent } from './netless-whiteboard/netless-whiteboard.component';

@NgModule({
  declarations: [
    ShowErrorsComponent, ClassesComponent,
    LoginComponent, ForgotPasswordComponent, ResetPasswordComponent, RegistrationComponent, CustomCheckboxFieldComponent, CustomCheckboxFormgroupComponent, FileFieldComponent, CustomPasswordComponent, OtpComponent, LiveClassBroadcastComponent, NetlessWhiteboardComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MatModuleModule
  ] ,
    exports: [
    CustomPasswordComponent,
    ShowErrorsComponent,
    ClassesComponent,
    LiveClassBroadcastComponent,
    NetlessWhiteboardComponent,
  ]
})
export class SharedModule { }
