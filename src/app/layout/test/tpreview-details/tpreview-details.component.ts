import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestService } from 'src/app/services/test.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-tpreview-details',
  templateUrl: './tpreview-details.component.html',
  styleUrls: ['./tpreview-details.component.css']
})
export class TpreviewDetailsComponent implements OnInit {

  testId;
  test;
  selectedQuestion;
  selectedQuestionIndex;
  selectedOptionIndex = {};
  constructor(
    private activatedRoute: ActivatedRoute,
    private testService: TestService,
  ) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.testId = paramMap.get('testId');
      if (this.testId) {
        this.testService.fetchTestById(this.testId);
      }
    });

    this.testService.$test
    .pipe(filter((test => !!test)))
    .subscribe(test => {
      this.test = test;
      this.selectedQuestionIndex = 0;
      this.selectedQuestion = this.test.questionDetails.questions[0];
    });
  }

  selectQuestion(q, i) {
    this.selectedQuestion = q;
    this.selectedQuestionIndex = i;
  }

  selectOption(i) {
    this.selectedOptionIndex[this.selectedQuestionIndex] = i;
  }

}
