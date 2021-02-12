import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AlertService } from './alert.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LiveClassService {
  alliveClasses;
  todaysLiveClasses;
  upcomingLiveClasses;
  completedLiveClasses;
  user;
  teacher;
  token;

  $teacher = new BehaviorSubject(null);
  $user = new BehaviorSubject(null);

  constructor(
    private router: Router,
    private api: ApiService,
    private alertService: AlertService,
  ) {

    const accessToken = localStorage.getItem('access_token');
    const user = localStorage.getItem('user');

    if (user) {
      this.user = JSON.parse(user);
      this.$user.next(this.user);
    }
    this.token = accessToken;

  }

  async addLiveClass( formData ) {
    const url = `/live-class`;
    const response: any = await this.api.post(url, formData).toPromise()
      .catch(error => {
        // const errorMessage = error.error.message;
        // this.alertService.error(errorMessage);
        throw error;
      });
      this.alertService.success('Live Class Added Successfully');
      return response;
  }

  async getAllLiveClasses() {
    const url = `/live-class/get-teachers-live-class`;
    const response: any = (await this.api.get(url).toPromise())['data'];
    console.log(response);
    
    this.todaysLiveClasses= response.groupedClasses.TODAY;
    this.upcomingLiveClasses= response.groupedClasses.FUTURE;
    this.completedLiveClasses= response.groupedClasses.PAST;
    return response; 
  }

  async validateStreamCode(streamCode) {
    const url = `/live-class/validate-stream-code`;
    const response: any = await this.api.post(url, {streamCode}).toPromise();
    return response;
  }

  async fetchLiveClassById(liveClassId) {
    const url = `/live-class/${liveClassId}`;
    const response: any = await this.api.get(url).toPromise();
    return response;
  }
}