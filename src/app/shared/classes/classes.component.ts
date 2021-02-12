import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: '[app-classes]',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css'],
})
export class ClassesComponent implements OnInit {

  @Input() liveClass;
  @Input() hideActions = false;
  ngOnInit() {
  }

}