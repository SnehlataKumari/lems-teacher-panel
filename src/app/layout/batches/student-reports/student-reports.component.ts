import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-student-reports',
  templateUrl: './student-reports.component.html',
  styleUrls: ['./student-reports.component.css']
})
export class StudentReportsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'uid', 'username', 'bdatetime' , 'sname' , ];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }
}

 
export interface PeriodicElement {
  id: string;
  uid: string;
  username: string;
  bdatetime: string;
  sname: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {id: '1', uid: 'data', username: 'data', bdatetime: 'data',sname: 'data',},
  {id: '2', uid: 'data', username: 'data', bdatetime: 'data',sname: 'data',},
  {id: '1', uid: 'data', username: 'data', bdatetime: 'data', sname: 'data',},
  {id: '2', uid: 'data', username: 'data', bdatetime: 'data', sname: 'data',},
  {id: '1', uid: 'data', username: 'data', bdatetime: 'data', sname: 'data',},
  {id: '2', uid: 'data', username: 'data', bdatetime: 'data',sname: 'data',},
]