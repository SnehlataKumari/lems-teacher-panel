import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TestService } from 'src/app/services/test.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-add-manual-question',
  templateUrl: './add-manual-question.component.html',
  styleUrls: ['./add-manual-question.component.css']
})
export class AddManualQuestionComponent implements OnInit {

  testId;
  selectedQuestionIndex = 0;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private testService: TestService,
    private alertService: AlertService,
    private router: Router
  ) { }

  get questionFG() {
    return this.fb.group({
      questionTitle: ['', Validators.required],
      explanation: [''],
      tags: ['', Validators.required],
      rightMarks: ['', Validators.required],
      negativeMarks: ['', Validators.required],
      dificultyLevel: ['', Validators.required],
      subject: ['', Validators.required],
      topic: ['', Validators.required],
      questionType: ['MCQ', Validators.required],
      language: [''],
      options: this.fb.array([
        this.optionFG,
        this.optionFG,
        this.optionFG,
        this.optionFG,
      ])
    });
  }

  get optionFG() {
    return this.fb.group({
      title: ''
    })
  }

  addQuestionForm = this.fb.group({
    questions: this.fb.array([])
  })

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.testId = paramMap.get('testId');
      if (this.testId) {
        this.testService.fetchTestById(this.testId);
      }
    });

    this.testService.$test.subscribe(test => {
      if (this.testId && test && test.questionDetails) {
        this.questions.controls = [];

        for (let i = 0; i < test.totalNoOfQuestions; i++) {
          this.questions.push(this.questionFG);
        }
        this.addQuestionForm.patchValue(test.questionDetails);
      }
    });
  }

  async saveQuestionDetails() {
    // console.log(this.addQuestionForm.value);
    
    await this.testService.updateTest(this.testId, {
      questionDetails: this.addQuestionForm.value
    });
    this.alertService.success('Questions saved successfully!');
    this.router.navigate(['test', this.testId, 'preview']);
  }

  get questions(): FormArray {
    return  this.addQuestionForm.get('questions') as FormArray;
  }

  getOptionsControl(question: FormGroup): FormArray {
    return question.get('options') as FormArray;
  }

  onChangeQuestion(i) {
    this.selectedQuestionIndex = i;
  }

  addQuestion() {
    this.questions.push(this.questionFG);
    this.selectedQuestionIndex = this.questions.length - 1;
  }

  deleteQuestion() {
    this.questions.removeAt(this.selectedQuestionIndex)
    if(this.selectedQuestionIndex === 0) {
      this.selectedQuestionIndex = 0;
    } else {
      this.selectedQuestionIndex = this.selectedQuestionIndex - 1;
    }
  }

  gotoPrevQuestion() {
    this.selectedQuestionIndex = this.selectedQuestionIndex - 1;
  }

  gotoNextQuestion() {
    this.selectedQuestionIndex = this.selectedQuestionIndex + 1;
  }

}
