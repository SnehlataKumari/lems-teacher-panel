import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, Form, AbstractControlOptions, ValidationErrors } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { FormService } from 'src/app/services/form.service';

const subjectsList = [
  'Math',
  'Physics',
  'Chemistry',
  'Biology',
  'Computer Science',
  'English',
  'Hindi',
  'Sanskrit',
  'German',
  'French',
  'Social Studies',
  'EVS',
  'Bussiness Studies',
  'Accountancy',
  'Arabic',
  'Others'
];

const gradeRangeList = [
  '1 to 5',
  '6 to 8',
  '9 & 10',
  '11 & 12 (Regular Curriculum)',
  '11 & 12 (JEE Mains Level)',
  'Others',
];

const availableTimes = [
  '6-7 am',
  '7-8 am',
  '8-9 am',
  '2-3 pm',
  '3-4 pm',
  '4-5 pm',
  '6-7 pm',
  '8-9 pm',
  'Full Time',
];

const boardsList = [
  'CBSC',
  'ICSC',
  'IGCSE',
  'Others',
];

declare var $:any;
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup;
  resumeFile: File;
  internetConnectionFile: File;
  subjects = subjectsList;
  gradeRangeList = gradeRangeList;
  boardsList = boardsList;
  availableTimes = availableTimes;
  termsAndConditions = new FormControl(false);

  mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$";
  
  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private formService: FormService,
    private fb: FormBuilder
  ) { }

  // FIXME: Apply validator to check that atleast one value is selected!
  getFGFromArray(itemList: any[], options: AbstractControlOptions = {}): FormGroup {
    const itemObj = itemList.reduce((prevObj, value) => {
      prevObj[value] = false;
      return prevObj;
    }, {});
    return this.fb.group(itemObj, options);
  }

  ngOnInit() {
    const primarySubjectsFG = this.getFGFromArray(this.subjects);
    const secondarySubjectsFG = this.getFGFromArray(this.subjects);
    const gradeToTeachFG = this.getFGFromArray(this.gradeRangeList);
    const boardFG = this.getFGFromArray(this.boardsList);
    const availableTimesFG = this.getFGFromArray(this.availableTimes, {validators: [this.validateAvailbleTimesFB]});
    const teachingHoursFG = this.fb.group({
      weekdays: '',
      weekends: ''
    });

    this.registrationForm = this.fb.group({
      user: this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        gender: [''],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern(this.mobNumberPattern)]],
        // this pattern of phone number is showing in the error message
      }),
      teacher: this.fb.group({
        highestQualification: [''],
        collegeDetails: ['', Validators.required],
        teachingExperience: ['', Validators.required],
        primaryTeachingSubjects: primarySubjectsFG,
        secondaryTeachingSubjects: secondarySubjectsFG,
        gradeToTeach: gradeToTeachFG,
        board: boardFG,
        teachingHours: teachingHoursFG,
        availableTimes: availableTimesFG,
        currentOccupation: ['', Validators.required],
        dateOfBirth: ['', Validators.required],
        typeOfInternetConnection: ['', Validators.required],
        downloadSpeed: ['', Validators.required],
        uploadSpeed: ['', Validators.required],
        associationWithLems: ['', Validators.required],
        location: ['', Validators.required],
        howKnowLemsAcademy: ['', Validators.required],
        // termsAndConditions: ['', Validators.required],
      })
    });

    this.registrationForm.get('teacher').get('availableTimes').get('Full Time').valueChanges.subscribe(() => {
      const availableTimesFB = this.registrationForm.get('teacher').get('availableTimes');
      if (availableTimesFB.get('Full Time').value === true) {
        availableTimes.forEach(at => {
          if ('Full Time' !== at) {
            availableTimesFB.get(at).setValue(false);
            availableTimesFB.get(at).disable();
          }
        });
      } else {
        availableTimes.forEach(at => {
          if ('Full Time' !== at) {
            availableTimesFB.get(at).enable();
          }
        });
      }
    })
  }

  validateAvailbleTimesFB(availableTimesFB: FormGroup): ValidationErrors | null {
    // console.log(availableTimesFB);
    // if (availableTimesFB.get('Full Time').value === true) {
    //   availableTimes.forEach(at => {
    //     if ('Full Time' !== at) {
    //       availableTimesFB.get(at).setValue(false);
    //       availableTimesFB.get(at).disable();
    //     }
    //   });
    // } else {
    //   availableTimes.forEach(at => {
    //     if ('Full Time' !== at) {
    //       availableTimesFB.get(at).enable();
    //     }
    //   });
    // }
    return null;
  }

  onSelectResume(resumeFile: File) {
    this.resumeFile = resumeFile;
  }
  
  onInterConnectionFile(internetConnectionFile: File) {
    this.internetConnectionFile = internetConnectionFile;
  }
  
  onSubmit() {
    if (!this.termsAndConditions.value) {
      return this.alertService.error('Please accept the Terms & Conditions.');
    }
    let formValue = this.registrationForm.value;
    formValue = JSON.parse(JSON.stringify(formValue));

    const formData = this.formService.jsonToFormData(formValue);
    formData.append('resumeFile', this.resumeFile);
    formData.append('internetConnectionFile', this.internetConnectionFile);    
    this.authService.teacherSignup(formData);
  }

}
