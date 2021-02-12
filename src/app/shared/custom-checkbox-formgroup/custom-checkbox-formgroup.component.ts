import { Component, OnInit, Input } from '@angular/core';
import { ControlContainer } from '@angular/forms';

@Component({
  selector: 'app-custom-checkbox-formgroup',
  templateUrl: './custom-checkbox-formgroup.component.html',
  styleUrls: ['./custom-checkbox-formgroup.component.css']
})
export class CustomCheckboxFormgroupComponent implements OnInit {

  @Input() title;
  @Input() required = false;
  @Input() optionsList = [];
  @Input() id;

  constructor(
    public controlContainer: ControlContainer
  ) { }

  ngOnInit(): void {
  }

}
