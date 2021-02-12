import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-apply-leave',
  templateUrl: './apply-leave.component.html',
  styleUrls: ['./apply-leave.component.css']
})
export class ApplyLeaveComponent implements OnInit {

  applyForLeaveForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.applyForLeaveForm = this.fb.group({
      startLeaveDate: ['', Validators.required],
      endLeaveDate: ['', Validators.required],
      durationOfLeave: ['', Validators.required],
      typeOfLeave: ['', Validators.required],
      leaveNote: '',
    })
  }

  async onSubmit() {
    const formValueStr = JSON.stringify(this.applyForLeaveForm.value, null, 2);
    const formValue = JSON.parse(formValueStr);
    return await this.authService.applyForLeave( formValue );
    
  }

}
