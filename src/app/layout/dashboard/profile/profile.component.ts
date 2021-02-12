import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, Validators,FormGroup } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { FormService } from 'src/app/services/form.service';
import { merge } from 'rxjs';
declare var $:any;
declare var iEdit:any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  editTeacherProfileForm: FormGroup;
  selectedProfileImg;
  mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$";
  
  constructor(
    public authService: AuthService,
    public alertService: AlertService,
    private formsService: FormService,
    private fb: FormBuilder
  ) { }

  changeTeacherPasswordForm = this.fb.group({
    oldPassword: ['', Validators.required],
    newPassword: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  },
    { validator: this.checkPasswords });
  
  ngOnInit(): void {
    const profileComp = this;
    $(document).on("change", ".fileInput", function (e2) {
      const img1 = e2.target.files[0];
      console.log(img1);
      
      this.images = img1
      if (!iEdit.open(img1, true, (res1) => {
        profileComp.selectedProfileImg = res1;
        $(e2.target).closest('.profile-img').find(".result").attr("src", res1);
      })) {
        this.alertService.console.error("Whoops! That is not an image!");
      }
    });

    this.editTeacherProfileForm = this.fb.group({
      user: this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: '',
        phone: ['', [Validators.required, Validators.pattern(this.mobNumberPattern)]],
       
      }),
      teacher: this.fb.group({
        highestQualification: '',
        extraField: '',
        aboutMe: '',
        location: '',
      })
    });

    merge(
      this.authService.$teacher,
      this.authService.$user
    ).subscribe(() => {
      this.populateDummyData(this.authService.$user.value, this.authService.$teacher.value);
    });

  }

  populateDummyData(user, teacher) {
    if (!teacher || !user) {
      return;
    }
    const dummtData = {
      "user": {
        "firstName": user.firstName,
        "lastName": user.lastName,
        "email": user.email,
        "phone": user.phone,      
       
      },
      "teacher": {
        "highestQualification": teacher.highestQualification, 
        "extraField": teacher.extraField,
        "aboutMe": teacher.aboutMe,
        "location": teacher.location,
      }
    };
    this.editTeacherProfileForm.patchValue(dummtData);
  }

  onChangeTeacherPassword() {
    const formData = this.changeTeacherPasswordForm.value;
    this.authService.changeTeacherPassword(formData);
    $('#change-password').modal('hide');
  }
  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.get('newPassword').value;
    let confirmPass = group.get('confirmPassword').value;
    return pass === confirmPass ? null : { notSame: true }
  }

  onSubmit() {
    let formData = this.editTeacherProfileForm.value;

    if (this.selectedProfileImg) {
      formData = {...formData, user: {
        ...formData.user,
        profileImage: this.selectedProfileImg
      }}
    }
    this.alertService.success('Profile updating please wait...');
    this.authService.editTeacherProfile(formData);
  }

}
