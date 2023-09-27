import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../shared/customer.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})

export class DialogAddUserComponent implements OnInit {
  customerForm!: FormGroup;
  loading = false;
  title = 'Add Employee';

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<DialogAddUserComponent>, private customerService: CustomerService, @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
    if (this.data !== null && this.data !== '') {
      this.title = 'Update Customer';
    } else {
      this.title = 'Add Customer';
    }
    this.customerForm = this.formBuilder.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],      
      Street: [''],
      ZipCode: [''],
      City: [''],
      Country: [''],
    });
    this.customerForm.patchValue(this.data);
  }

  addCustomer() {
    if (this.customerForm.valid) {
      const userData = this.customerForm.value;
      if (this.data !== null && this.data !== '') {
        this.customerService.updateCustomer(this.data.id, userData).then(
          (res: any) => {
            this.getCustomers();
            this.customerForm.reset();
            this.dialogRef.close();
            console.log('data is updated successfully!!');
          }
        ).catch(
          (res: any) => {
            console.log('Something went wrong!!');
          });

      } else {
        this.customerService.addCustomer(userData).then(
          (res: any) => {
            this.getCustomers();
            this.customerForm.reset();
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

  async getCustomers() {
    try {
      const orders = await this.customerService.getCustomer();
      console.log('Orders:', orders);
      this.customerService.sendData(orders);
      // Use the retrieved data as needed in your component
      // this.filteredData = employees;
    } catch (error) {
      // Handle the error appropriately
    }
  }



}
