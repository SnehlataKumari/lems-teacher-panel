import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RegistrationComponent } from './registration/registration.component';
import { OtpComponent } from './otp/otp.component';

const routes: Routes = [
  { path: '', redirectTo:"/login", pathMatch:'full'},
  { path: 'login', component: LoginComponent},
  { path: 'forgot-password',component: ForgotPasswordComponent},
  { path: 'reset-password/:token',component: ResetPasswordComponent},
  { path: 'signup',component: RegistrationComponent},
  { path: 'otp',component: OtpComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
