import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployService } from '../shared/employ.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DocumentData, QuerySnapshot } from '@firebase/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog-add-employees',
  templateUrl: './dialog-add-employees.component.html',
  styleUrls: ['./dialog-add-employees.component.scss']
})
export class DialogAddEmployeesComponent implements OnInit {
  employeesForm!: FormGroup;
  loading = false;
  title = 'Add Employee';
  empCollectiondata: any = [];
  employData: any = [];

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<DialogAddEmployeesComponent>, private empService: EmployService, @Inject(MAT_DIALOG_DATA) public data: any, private snackBar: MatSnackBar) { }

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
            this.getEmployees();
            this.employeesForm.reset();
            this.snackBar.open('Employee updated succesfully', 'Close', {
              duration: 3000, // Display the alert for 3 seconds
              panelClass: ['success-snackbar'], // Use custom CSS class for styling (optional)
            });
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
            this.getEmployees();
            this.employeesForm.reset();
            this.snackBar.open('Employee added succesfully', 'Close', {
              duration: 3000, // Display the alert for 3 seconds
              panelClass: ['success-snackbar'], // Use custom CSS class for styling (optional)
            });
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

  async getEmployees() {
    try {
      const employees = await this.empService.getEmployees();
      console.log('Employees:', employees);
      this.empService.sendData(employees);
      // Use the retrieved data as needed in your component
      // this.filteredData = employees;
    } catch (error) {
      // Handle the error appropriately
    }
  }




}
