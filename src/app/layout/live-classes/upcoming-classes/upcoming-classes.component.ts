import { Component, OnInit } from '@angular/core';
import { LiveClassService } from 'src/app/services/live-class.service';
import { matchSorter } from 'match-sorter';

@Component({
  selector: 'app-upcoming-classes',
  templateUrl: './upcoming-classes.component.html',
  styleUrls: ['./upcoming-classes.component.css']
})
export class UpcomingClassesComponent implements OnInit {

  upcomingLiveClasses;
  filteredClasses;
  viewList;
  length;
  pageSize = 10;
  keysToFilterOn = ['title', 'allowedWatchCount', 'time'];
  constructor(
    private liveClassService: LiveClassService,
  ) { }

  ngOnInit(): void {
    this.getLiveClass();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filteredClasses = matchSorter(this.upcomingLiveClasses, filterValue, { keys: this.keysToFilterOn });
    this.length = this.filteredClasses.length;
    this.setViewList(0);
  }

  setViewList(pageIndex) {
    this.viewList = this.filteredClasses.slice(pageIndex*this.pageSize, ((pageIndex+1)*this.pageSize));
  }

  async getLiveClass() {
    const x = await this.liveClassService.getAllLiveClasses();
    this.upcomingLiveClasses = this.liveClassService.upcomingLiveClasses;
    if(this.upcomingLiveClasses) {
      this.filteredClasses = this.upcomingLiveClasses;
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
