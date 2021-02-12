import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { LiveClassService } from 'src/app/services/live-class.service';
import { UploadFileService } from 'src/app/services/upload-file.service';
import * as moment from 'moment';
import { AlertService } from 'src/app/services/alert.service';

declare var $:any;

@Component({
  selector: 'app-add-live-classes',
  templateUrl: './add-live-classes.component.html',
  styleUrls: ['./add-live-classes.component.css'],
})
export class AddLiveClassesComponent implements OnInit {
  addLiveClassForm: FormGroup;
  progress: number;
  uploadPosterId: any;
  message: string;

  isSubmitting = false;
  constructor(
    private fb: FormBuilder,
    private liveClassService: LiveClassService,
    private uploadService: UploadFileService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    //   $('input[type="file"]').change(function(e){
    //     var fileName = e.target.files[0].name;
    //     $('.custom-file-label').html(fileName);
    // });

    this.addLiveClassForm = this.fb.group({
      title: ['', Validators.required],
      streamCode: ['', Validators.required, this.validateStreamCode.bind(this)],
      description: ['', Validators.required],
      testId: ['', Validators.required],
      classStartTime: ['', Validators.required],
      date: ['', [Validators.required, this.validateDate.bind(this)]],
      classEndTime: ['', Validators.required],
      approxStreamTime: ['', [Validators.required]],
      allowedNoOfStudents: ['', Validators.required],
      allowedNoOfDemoStudents: ['', Validators.required],
      selectedGroup: ['', Validators.required],
    });
  }
  single;
  singleFiles(event) {
    var singleFiles = event.target.files;
    this.single = singleFiles[0];

    if (singleFiles) {
      for (var file of singleFiles) {
        var singleReader = new FileReader();
        singleReader.onload = (e) => {
          $(event.target)
            .closest('.img')
            .find('.imagefile')
            .attr('src', e.target.result)
            .show();
        };
        singleReader.readAsDataURL(file);
      }
    }
  }

  validateDate(control: AbstractControl) {
    return null;
    // return moment().isSameOrBefore(moment(control.value)) ? null : {beforeDate: 'You can request on past date.'};
  }

  async onAddLiveClass() {
    if (this.addLiveClassForm.invalid) {
      this.addLiveClassForm.markAllAsTouched();
      this.addLiveClassForm.updateValueAndValidity();
      return;
    }

    this.isSubmitting = true;

    let formData = this.addLiveClassForm.value;
    formData = JSON.parse(JSON.stringify(formData));

    if (this.single) {
      this.uploadService.upload(this.single).subscribe(
        async (event) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round((100 * event.loaded) / event.total);
          } else if (event instanceof HttpResponse) {
            const reqBody = {
              posterDocumentId: event.body['_id'],
              ...formData,
            };

            await this.createLiveClass(reqBody);
            this.isSubmitting = false;
          }
        },
        (err) => {
          this.progress = 0;
          this.message = 'Could not upload the file!';
          this.single = undefined;
        }
      );
      this.single = undefined;
    } else {
      this.createLiveClass(formData);
    }
  }

  async createLiveClass(formData) {
    return this.liveClassService.addLiveClass(formData).catch((error) => {
      this.alertService.error(error.message);
      this.isSubmitting = false;
    });
  }

  async validateStreamCode(control: AbstractControl) {
    const isValid = await this.liveClassService.validateStreamCode(
      control.value
    );
    return isValid ? null : { streamCodeNotUnique: 'Stream Code is dublicate' };
  }

  // routerLink = "/live-class/live-claas"
}
