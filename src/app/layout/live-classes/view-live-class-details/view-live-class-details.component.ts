import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { LiveClassService } from 'src/app/services/live-class.service';
// import matchSorter from 'match-sorter';

@Component({
  selector: 'app-view-live-class-details',
  templateUrl: './view-live-class-details.component.html',
  styleUrls: ['./view-live-class-details.component.css']
})
export class ViewLiveClassDetailsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'uid', 'username' , 'time', 'date', 'subject' ];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(
    private activatedRoute: ActivatedRoute,
    private liveClassService: LiveClassService,
   ) { }
  liveClassId;
  currentLiveClass;
  // displayedColumns: string[] = displayedColumns;
  // dataSource: MatTableDataSource<any>;
  // keysToFilterOn = ['streamCode', 'user.firstName', 'selectedGroup'];
  ngOnInit() {
    this.dataSource.paginator = this.paginator;

    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.liveClassId = paramMap.get('liveClassId');
      
      if (this.liveClassId) {
        this.getCurrentLiveClass(this.liveClassId);  
      }
    });
  }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }

  async getCurrentLiveClass(liveClassId) {
    this.currentLiveClass = (await this.liveClassService.fetchLiveClassById(liveClassId))['data'];
    return this.currentLiveClass;
  }
}

 
export interface PeriodicElement {
  id: string;
  uid: string;
  username: string;
  time: string;
  date: string;
  subject: string; 
}
const ELEMENT_DATA: PeriodicElement[] = [
  {id: '1', uid: 'data', username: 'data', time: 'data', date: 'data', subject: 'data'},
  {id: '1', uid: 'data', username: 'data', time: 'data', date: 'data', subject: 'data'},
  {id: '1', uid: 'data', username: 'data', time: 'data', date: 'data', subject: 'data'},

  
]
