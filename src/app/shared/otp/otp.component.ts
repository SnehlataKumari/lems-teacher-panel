import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $('.otp .otp-labl .otp1').keyup(function (e) {
      var key = e.which || e.keyCode || e.charCode;
      if (key == 8 || key == 46) {
        let is_first_child = $($(this).parent('.otp-labl')).is(':first-child');
        if (!is_first_child)
          $(this).parent('.otp-labl').prev('.otp-labl').children('.otp1').trigger("select");
        return;
      }
    
      $(this).parent('.otp-labl').next('.otp-labl').children('.otp1').trigger("select");
      
      if (String.fromCharCode(e.keyCode).match(/[^0-9]/g)) return false;
    
    });
  }

}
