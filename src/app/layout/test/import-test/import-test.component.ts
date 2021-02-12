import { Component, OnInit } from '@angular/core';
import { UploadFileService } from 'src/app/services/upload-file.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { TestService } from 'src/app/services/test.service';
import { AlertService } from 'src/app/services/alert.service';

declare var $:any;
@Component({
  selector: 'app-import-test',
  templateUrl: './import-test.component.html',
  styleUrls: ['./import-test.component.css']
})

export class ImportTestComponent implements OnInit {

  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';

  fileInfos: Observable<any>;
  hostUrl = environment.hostUrl;
  testId;

  constructor(
    private uploadService: UploadFileService,
    private testService: TestService,
    private alertService: AlertService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.testId = paramMap.get('testId');
    });

    $('input[type="file"]').change(function (e) {
      var fileName = e.target.files[0].name;
      $('.custom-file-label').html(fileName);
  });
  }

  selectFile(event): void {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.progress = 0;

    this.currentFile = this.selectedFiles.item(0);
    console.log(this.currentFile);
    
    this.uploadService.upload(this.currentFile).subscribe(
      async event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          if (this.testId) {
            this.alertService.alert('Migrations of questions may take longer, We will update you on your email.');
            await this.testService.migrateQuestions({
              testId: this.testId,
              documentId: event.body['_id']
            });
          }
        }
      },
      err => {
        this.progress = 0;
        this.message = 'Could not upload the file!';
        this.currentFile = undefined;
      });
    this.selectedFiles = undefined;
  }

}


