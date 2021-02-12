import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-batches',
  templateUrl: './batches.component.html',
  styleUrls: ['./batches.component.css']
})
export class BatchesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'uid', 'username', 'bdatetime' , 'live' , ];
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
}
const ELEMENT_DATA: PeriodicElement[] = [
  {id: '1', uid: 'data', username: 'data', bdatetime: 'data',},
  {id: '1', uid: 'data', username: 'data', bdatetime: 'data',},
  {id: '1', uid: 'data', username: 'data', bdatetime: 'data',},
]