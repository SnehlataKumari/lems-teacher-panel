import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestService } from 'src/app/services/test.service';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-test-setting',
  templateUrl: './test-setting.component.html',
  styleUrls: ['./test-setting.component.css']
})
export class TestSettingComponent implements OnInit {
  testSettingForm: FormGroup;
  testId;
  constructor(
    private activateRoute: ActivatedRoute,
    private testService: TestService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe((paramMap) => {
      const testId = paramMap.get('testId');
      this.testId = testId;
      this.testService.fetchTestById(this.testId);
    });

    this.testSettingForm = this.fb.group({
      arrangementAndGroupingRandomQuestion: this.fb.group({
        shuffleQuestionWithSubject: [null],
        groupQuestionSubjectwise: [null],
        optionwiseShuffeling: [null],
      }),
      timeSetting: this.fb.group({
        timeBound: [null],
        clockFormat: [null],
        alloteTimeToEachSection: [null],
        questionWiseTime: [null],
      }),
      generateRank: [null],
      candidateReport: [null],
      multipleAttempt: [null],
      fullScreen: this.fb.group({
        fullScreenMode: [null],
        numberOfAttempts: ['']
      })
    });

    this.testService.$test.subscribe((test) => {
      if (this.testId && test && test.testSettings) {
        this.testSettingForm.patchValue(test.testSettings);
      }
    });
  }

  async onTestSetting() {
    const formData  = this.testSettingForm.value;
    await this.testService.updateTest(this.testId, {testSettings: formData});
    this.router.navigate(['test', this.testId, 'add-questions']);
  }

}
