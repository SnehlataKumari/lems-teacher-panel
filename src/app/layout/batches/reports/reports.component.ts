import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'uid', 'username', 'bdatetime' ,'doe', 'sname' ,'action' , ];
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
  doe: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {id: '1', uid: 'data', username: 'data', bdatetime: 'data',doe: 'data',},
  {id: '1', uid: 'data', username: 'data', bdatetime: 'data',doe: 'data',},
  {id: '1', uid: 'data', username: 'data', bdatetime: 'data',doe: 'data',},
  {id: '1', uid: 'data', username: 'data', bdatetime: 'data',doe: 'data',},
  {id: '1', uid: 'data', username: 'data', bdatetime: 'data',doe: 'data',},
]

