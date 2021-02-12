import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AlertService } from './alert.service';
import { BehaviorSubject } from 'rxjs';
import { FormService } from './form.service';
import { AuthService } from './auth.service';
import { findIndex } from 'lodash';

@Injectable({
  providedIn: 'root'
})

export class TestService {
  
  $test = new BehaviorSubject(null);
  $testList = new BehaviorSubject([]);

  constructor(
    private router: Router,
    private api: ApiService,
    private alertService: AlertService,
    private authservice: AuthService,
  ) {}

  async fetchAllTests() {
    const url = '/tests';
    const response = await this.api.get(url).toPromise()
      .catch(error => {
        const errorMessage = error.error.message;
        this.alertService.error(errorMessage);
        throw error;
      });

    this.$testList.next(response['data']);
  }
  
  async addTest(formData) {
    const url = `/tests`;
    const response: any = await this.api.post(url, formData).toPromise()
      .catch(error => {
        const errorMessage = error.error.message;
        this.alertService.error(errorMessage);
        throw error;
      });
    const testId = response['data']._id;
    this.$test.next(response['data']);
    this.router.navigate(['test', testId , 'test-setting']);
  }

  async fetchTestById(testId) {
    const url = `/tests/${testId}`;
    const response: any = await this.api.get(url).toPromise()
      .catch(error => {
        const errorMessage = error.error.message;
        this.alertService.error(errorMessage);
        throw error;
      });

    const test = response['data'];
    this.$test.next(test);
  }

  async updateTest(testId, formData) {
    const url = `/tests/${testId}`;
    const response = await this.api.put(url, formData).toPromise()
      .catch(error => {
        const errorMessage = error.error.message;
        this.alertService.error(errorMessage);
        throw error;
      });
    this.$test.next(response['data']);
  }

  async deleteTest(testId) {
    const url = `/tests/${testId}`;
    const response = await this.api.delete(url).toPromise()
      .catch(error => {
        const errorMessage = error.error.message;
        this.alertService.error(errorMessage);
        throw error;
      });
    this.$test.next(null);
    const testList = this.$testList.value;
    if(testList.length > 0) {
      const index = findIndex(testList, { _id: testId});

      if (index > -1) {
        testList.splice(index, 1);
      }

      const newTestList = [...testList];
      this.$testList.next(newTestList); 
    }
  }

  async migrateQuestions({testId, documentId}) {  
    return await this.api.post('/import/questions', {testId, documentId}).toPromise();
  }
}