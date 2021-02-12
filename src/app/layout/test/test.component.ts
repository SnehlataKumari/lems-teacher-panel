import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { TestService } from 'src/app/services/test.service';
import { AlertService } from 'src/app/services/alert.service';
import { SelectionModel } from '@angular/cdk/collections';

const displayedColumns = [
  'select',
  'name',
  'questionCount',
  'difficultyLevel',
  'category',
  'action'
];

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  
  // @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(
    private testService: TestService,
    private alertService: AlertService,
  ) {}

  displayedColumns: string[] = displayedColumns;
  dataSource: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);

  ngOnInit() {

    this.testService.fetchAllTests();
    this.testService.$testList.subscribe((testList) => {
      this.dataSource = new MatTableDataSource(testList);
      // this.dataSource.paginator = this.paginator;
    });

  }

  onReject(test) {
    this.setTestApproval(test, false);
    this.alertService.success(`Test ${test.testName} rejected successfully!`);
  }

  onApprove(test) {
    this.setTestApproval(test, true);
    this.alertService.success(`Test ${test.testName} approved successfully!`);
  }

  async setTestApproval(test, isApproved) {
    await this.testService.updateTest(test._id, {
      isApproved
    });
  }

  async deleteTest(test) {
    await this.testService.deleteTest(test._id);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  onDeleteSelected() {
    this.selection.selected.forEach(test => {
      this.deleteTest(test);
    });
  }
}
