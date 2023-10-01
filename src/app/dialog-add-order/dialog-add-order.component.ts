import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrdersService } from '../shared/orders.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-dialog-add-order',
  templateUrl: './dialog-add-order.component.html',
  styleUrls: ['./dialog-add-order.component.scss']
})
export class DialogAddOrderComponent implements OnInit {
  orderForm!: FormGroup;
  loading = false;
  title = 'Add Test';


  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<DialogAddOrderComponent>, private orderService: OrdersService, @Inject(MAT_DIALOG_DATA) public data: any,private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if (this.data !== null && this.data !== '') {
      this.title = 'Update Order';
    } else {
      this.title = 'Add Order';
    }
    this.orderForm = this.formBuilder.group({
      Item: ['', Validators.required],
      Name: ['', Validators.required],
      Amount: ['', [Validators.required]],
      Status: ['', Validators.required],      
      Country: ['', Validators.required],
      Date: ['', Validators.required],
    });
    this.orderForm.patchValue(this.data);
  }

  addOrders() {
    if (this.orderForm.valid) {
      const userData = this.orderForm.value;
      if (this.data !== null && this.data !== '') {
        this.orderService.updateOrders(this.data.id, userData).then(
          (res: any) => {
            this.getOrders();
            this.orderForm.reset();
            this.snackBar.open('Order updated succesfully', 'Close', {
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
        this.orderService.addOrders(userData).then(
          (res: any) => {
            this.getOrders();
            this.orderForm.reset();
            this.snackBar.open('Order added succesfully', 'Close', {
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

  async getOrders() {
    try {
      const orders = await this.orderService.getOrder();
      console.log('Orders:', orders);
      this.orderService.sendData(orders);
      // Use the retrieved data as needed in your component
      // this.filteredData = employees;
    } catch (error) {
      // Handle the error appropriately
    }
  }
}
