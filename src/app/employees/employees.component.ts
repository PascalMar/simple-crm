import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddEmployeesComponent } from '../dialog-add-employees/dialog-add-employees.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {


  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {

  }



  openDialog() {
    this.dialog.open(DialogAddEmployeesComponent)
  }

}
