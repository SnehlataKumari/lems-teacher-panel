import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { LiveClassService } from 'src/app/services/live-class.service';
import {matchSorter} from 'match-sorter';
@Component({
  selector: 'app-complate-classes',
  templateUrl: './complate-classes.component.html',
  styleUrls: ['./complate-classes.component.css']
})
export class ComplateClassesComponent implements OnInit {

  completedLiveClasses;
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
    this.filteredClasses= matchSorter(this.completedLiveClasses, filterValue, { keys: this.keysToFilterOn });
    if(this.filteredClasses) {

      this.length = this.filteredClasses.length;
      this.setViewList(0);
    }
  }

  setViewList(pageIndex) {
    this.viewList = this.filteredClasses.slice(pageIndex * this.pageSize, ((pageIndex + 1) * this.pageSize));
  }

  async getLiveClass() {
     await this.liveClassService.getAllLiveClasses();
    this.completedLiveClasses = this.liveClassService.completedLiveClasses;
    if(this.completedLiveClasses) {
      this.filteredClasses = this.completedLiveClasses;
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
