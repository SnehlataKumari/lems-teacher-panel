import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { TestService } from 'src/app/services/test.service';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';

const displayedColumns = [
  'testCode',
  'testName',
  'createdAt',
  'requestSharedDate',
  'status'
];
@Component({
  selector: 'app-request-approval',
  templateUrl: './request-approval.component.html',
  styleUrls: ['./request-approval.component.css']
})
export class RequestApprovalComponent implements OnInit {

  constructor(
    private testService: TestService,
    private alertService: AlertService,
  ) { }
  
  selectedTest;
  displayedColumns: string[] = displayedColumns ;
  dataSource: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);
  // @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  selectTest(test) {
    this.selectedTest = test;
  }
  ngOnInit() {
    this.testService.fetchAllTests();
    this.testService.$testList.subscribe((testList) => {
      this.dataSource = new MatTableDataSource(testList);
    });
    // this.dataSource.paginator = this.paginator;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}


