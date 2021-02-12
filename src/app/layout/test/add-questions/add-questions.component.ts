import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { TestService } from 'src/app/services/test.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.css']
})
export class AddQuestionsComponent implements OnInit {

  testId;
  constructor(
    private activateRoute: ActivatedRoute,
    private testService: TestService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe((paramMap) => {
      const testId = paramMap.get('testId');
      this.testId = testId;
      this.testService.fetchTestById(testId);
    });

  }

}
