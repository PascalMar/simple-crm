import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrdersService } from '../shared/orders.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-add-order',
  templateUrl: './dialog-add-order.component.html',
  styleUrls: ['./dialog-add-order.component.scss']
})
export class DialogAddOrderComponent implements OnInit {
  orderForm!: FormGroup;
  loading = false;
  title = 'Add Test';

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<DialogAddOrderComponent>, private orderService: OrdersService, @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
    if (this.data !== null && this.data !== '') {
      this.title = 'Update Employee';
    } else {
      this.title = 'Add Employee';
    }
    this.orderForm = this.formBuilder.group({
      Item: ['', Validators.required],
      Name: ['', Validators.required],
      Amount: ['', [Validators.required]],
      Status: ['', Validators.required],
      id: ['', Validators.required],
      Location: ['', Validators.required],
      Date: ['', Validators.required],
    });
    this.orderForm.patchValue(this.data);
  }

  addOrder() {
    if (this.orderForm.valid) {
      const userData = this.orderForm.value;
      if (this.data !== null && this.data !== '') {
        this.orderService.updateOrder(this.data.id, userData).then(
          (res: any) => {
            this.orderForm.reset();
            this.dialogRef.close();
            console.log('data is updated successfully!!');
          }
        ).catch(
          (res: any) => {
            console.log('Something went wrong!!');
          });

      } else {
        this.orderService.addOrder(userData).then(
          (res: any) => {
            this.orderForm.reset();
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
