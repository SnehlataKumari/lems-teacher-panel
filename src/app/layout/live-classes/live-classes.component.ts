import {Component, OnInit, ViewChild} from '@angular/core';
import { LiveClassService } from 'src/app/services/live-class.service';
import { matchSorter } from 'match-sorter';

@Component({
  selector: 'app-live-classes',
  templateUrl: './live-classes.component.html',
  styleUrls: ['./live-classes.component.css']
})
export class LiveClassesComponent implements OnInit {


  allLiveClasses;
  todaysliveClasses;
  filteredClasses;
  viewList;
  length;
  pageSize = 10;
  keysToFilterOn = ['title', 'allowedWatchCount', 'time'];
  
  constructor(
    private liveClassService: LiveClassService,
  ) { }

  ngOnInit() {
    this.getLiveClass();   
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filteredClasses = matchSorter(this.todaysliveClasses, filterValue, { keys: this.keysToFilterOn });
    this.length = this.filteredClasses.length;
  }
  setViewList(pageIndex) {
    this.viewList = this.filteredClasses.slice(pageIndex * this.pageSize, ((pageIndex + 1) * this.pageSize));
  }

  async getLiveClass() {
    this.allLiveClasses = await this.liveClassService.getAllLiveClasses();
    this.todaysliveClasses = await this.liveClassService.todaysLiveClasses;
    console.log(this.liveClassService.todaysLiveClasses);
    
    if(this.todaysliveClasses) {
      this.filteredClasses = this.todaysliveClasses;
       this.length = this.filteredClasses.length;
      this.setViewList(0);
    }
  }
  changedPagination(event) {
    const pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.setViewList(pageIndex);
  }
  
}