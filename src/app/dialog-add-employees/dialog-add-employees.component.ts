import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployService } from '../shared/employ.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-employees',
  templateUrl: './dialog-add-employees.component.html',
  styleUrls: ['./dialog-add-employees.component.scss']
})
export class DialogAddEmployeesComponent implements OnInit {
  employeesForm!: FormGroup;
  loading = false;
  title = 'Add Employee';

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<DialogAddEmployeesComponent>, private empService: EmployService, @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
    if (this.data !== null && this.data !== '') {
      this.title = 'Update Employee';
    } else {
      this.title = 'Add Employee';
    }
    this.employeesForm = this.formBuilder.group({
      Name: ['', Validators.required],
      Designation: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      Country: [''],
      Hiredate: [''],
      Reportto: [''],
      City: [''],
    });
    this.employeesForm.patchValue(this.data);
  }

  addEmployees() {
    if (this.employeesForm.valid) {
      const userData = this.employeesForm.value;
      if (this.data !== null && this.data !== '') {
        this.empService.updateEployee(this.data.id, userData).then(
          (res: any) => {
            this.employeesForm.reset();
            this.dialogRef.close();
            console.log('data is updated successfully!!');
          }
        ).catch(
          (res: any) => {
            console.log('Something went wrong!!');
          });

      } else {
        this.empService.addEmployee(userData).then(
          (res: any) => {
            this.employeesForm.reset();
            this.dialogRef.close();
            console.log('data is added successfully!!');
          }
        ).catch(
          (res: any) => {
            console.log('Something went wrong!!');
          });
      }


    }
  }
}
