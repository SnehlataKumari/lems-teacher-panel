import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AlertService } from './alert.service';
import { BehaviorSubject } from 'rxjs';
import { FormService } from './form.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user;
  teacher;
  token;

  $teacher = new BehaviorSubject(null);
  $user = new BehaviorSubject(null);

  constructor(
    private router: Router,
    private api: ApiService,
    private alertService: AlertService,
    private formsService: FormService
  ) {

    const accessToken = localStorage.getItem('access_token');
    const user = localStorage.getItem('user');

    if (user) {
      this.user = JSON.parse(user);
      this.$user.next(this.user);
      this.getExtraDetails();
    }
    this.token = accessToken;
  }

  async getExtraDetails() {
    // TODO: Remove hardcoded value 'TEACHER'
    
    if (this.user.role === 'TEACHER') {
      this.fetchTeachersDetail();
    }
  }

  async teacherSignup(formValue) {
    const url = `/auth/signup-teacher`;
    const response: any = await this.api.post(url, formValue).toPromise()
      .catch(error => {
        this.handleSignupError(error);
        throw error;
      });
    this.afterTeacherSignup(response);
  }

  handleSignupError(error) {
    let errorMessage = error.error.message;
    if (errorMessage.includes('Cast to Number failed ')) {
      errorMessage = "Please Provide Valid Mobile Number!";
    }

    if (error.error.message === 'Duplicate value for field phone.') {
      errorMessage = 'Mobile Number already registered, Please try another one.'
    }
    this.alertService.error(errorMessage);
  }

  async loginTeacher(formValue) {
    const url = `/auth/login-teacher`;
    const response: any = await this.api.post(url, formValue).toPromise()
      .catch(error => {
        const errorMessage = error.error.message;
        this.alertService.error(errorMessage);
        throw error;
      });
    this.afterLogin(response);
  }

  afterTeacherSignup(response){
    this.alertService.success('Registration successful!')
    .then(() => {
      this.router.navigate(['']);
    });
  }

  afterLogin(response) {
    const { data: { token: access_token, user } } = response;
    this.user = user;
    this.$user.next(this.user);
    this.token = access_token;
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('user', JSON.stringify(user));
    this.getExtraDetails()
    // TODO:
    // Action Dispatch 
    // Store me data save kr dega.
    this.navigateAfterLogin();
  }

  navigateAfterLogin() {
    this.router.navigate(['home', 'dashboard']);
  }

  async fetchTeachersDetail() {
    const url = `/teachers/get-teacher-details`;
    const response = await this.api.get(url).toPromise();
    this.teacher = response['data'];
    this.$teacher.next(this.teacher);                                                         
  }

  afterLogout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    this.user = null;
    this.$user.next(this.user);
    this.token = null;
    this.router.navigate(['login']);
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    this.user = null;
    this.$user.next(this.user);
    this.token = null;
    this.router.navigate(['']);
  }

  isLoggedIn() {
    const accessToken = localStorage.getItem('access_token');
    return !!accessToken;
  }

  getLogginedUserRole(): string {
    return this.user.role;
  }

  async forgotTeacherPassword(formValue) {
    const url = `/auth/forgot-password-teacher`;
    const response: any = await this.api.post(url, 
      formValue
    ).toPromise()
      .catch(error => {
        const errorMessage = error.error.message;
        this.alertService.error(errorMessage);
        throw error;
      });

    this.alertService.success('Reset password link sent on your email.');
    // this.router.navigate(['reset-password']);

  }

  async resetTeacherPassword(formValue) {
    const url = `/auth/reset-password`;
    const response: any = await this.api.post(url, formValue).toPromise()
      .catch(error => {
        const errorMessage = error.error.message;
        this.alertService.error(errorMessage);
        throw error;
      });
    this.alertService.success('Password updated successfully :)');
    this.router.navigate(['']);
  }

  async changeTeacherPassword(formValue) {
    const url = `/auth/change-password`;
    const response: any = await this.api.post(url, formValue).toPromise()
      .catch(error => {
        const errorMessage = error.error.message;
        this.alertService.error(errorMessage);
        throw error;
      });
    this.alertService.success('Password changed successfully :)');
  }
// -------------------------------------VIA TEACHER PANEL-------------------------------------
  async editTeacherProfile(formValue) {
    const url = `/auth/edit-profile-teacher`;
    const response: any = await this.api.put(url, this.formsService.jsonToFormData(formValue)).toPromise()
      .catch(error => {
        const errorMessage = error.error.message;
        this.alertService.error(errorMessage);
        throw error;
      });
    this.$teacher.next({ ...this.$teacher.value, ...formValue.teacher });
    this.$user.next({...this.$user.value, ...formValue.user});
    this.user = this.$user.value;
    localStorage.setItem('user', JSON.stringify(this.user));
    this.alertService.success('Profile updated successfully :)');
  }
//-------------------------------VIA TEACHER PANEL ---------------------------------------
  async applyForLeave(formValue) {
    const url = `/leave`;
    const response: any = await this.api.post(url, formValue).toPromise()
      .catch(error => {
        const errorMessage = error.error.message;
        this.alertService.error(errorMessage);
        throw error;
      });
    this.alertService.success('Leave Applied successfully :)');
  }
  
}