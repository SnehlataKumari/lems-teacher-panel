import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-doubt-reports',
  templateUrl: './doubt-reports.component.html',
  styleUrls: ['./doubt-reports.component.css']
})
export class DoubtReportsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'uid', 'username',];
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
}
const ELEMENT_DATA: PeriodicElement[] = [
  {id: '1', uid: 'data', username: 'data',},
  {id: '1', uid: 'data', username: 'data',},
  {id: '1', uid: 'data', username: 'data',},
  {id: '1', uid: 'data', username: 'data',},
  {id: '1', uid: 'data', username: 'data',},
]