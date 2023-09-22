import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-employees',
  templateUrl: './dialog-add-employees.component.html',
  styleUrls: ['./dialog-add-employees.component.scss']
})
export class DialogAddEmployeesComponent implements OnInit {
  employeesForm!: FormGroup;
  loading = false;

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<DialogAddEmployeesComponent>) { }

  ngOnInit(): void {
    this.employeesForm = this.formBuilder.group({
      Name: ['', Validators.required],
      Designation: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      Country: [''],
      Hiredate: [''],
      Reportto: [''],
      City: [''],
    });
  }

  addEmployees() {
    if (this.employeesForm.valid) {
      const userData = this.employeesForm.value;
    }
  }
}
