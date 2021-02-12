import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-file-field',
  templateUrl: './file-field.component.html',
  styleUrls: ['./file-field.component.css']
})
export class FileFieldComponent implements OnInit {

  @Input() isMultiple = false;
  @Input() title;
  @Output() onSelectFile = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onFilechange(fileList: FileList) {
    const file = this.isMultiple ? fileList : fileList[0];
    this.onSelectFile.emit(file);
  }

}
