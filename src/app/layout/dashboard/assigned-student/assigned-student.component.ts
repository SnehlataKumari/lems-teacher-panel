import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-assigned-student',
  templateUrl: './assigned-student.component.html',
  styleUrls: ['./assigned-student.component.css']
})
export class AssignedStudentComponent implements OnInit {
  displayedColumns: string[] = ['id', 'uid', 'doe', 'username', 'bdatetime' , 'sname' ,'assign'  , ];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }
}

 
export interface PeriodicElement {
  id: string;
  uid: string;
  doe: string;
  username: string;
  bdatetime: string;
  sname: string;
  assign:string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {id: '1', uid: 'data', doe: 'data', username: 'data', bdatetime: 'data', sname: 'data', assign: 'data',},
  {id: '1', uid: 'data', doe: 'data', username: 'data', bdatetime: 'data', sname: 'data', assign: 'data',},
  {id: '1', uid: 'data', doe: 'data', username: 'data', bdatetime: 'data', sname: 'data', assign: 'data',},
  {id: '1', uid: 'data', doe: 'data', username: 'data', bdatetime: 'data', sname: 'data', assign: 'data',},
  {id: '1', uid: 'data', doe: 'data', username: 'data', bdatetime: 'data', sname: 'data', assign: 'data',},
  
]
