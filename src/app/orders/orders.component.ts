import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrdersService } from '../shared/orders.service';
import { DialogAddOrderComponent } from '../dialog-add-order/dialog-add-order.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  allOrders: any;
  ordersCollectiondata: any = [];
  searchQuery: string = '';
  filteredData: any = [];
  p: number = 1;


  constructor(public dialog: MatDialog, private orderService: OrdersService) { }

  ngOnInit(): void {
    this.orderService.getData().subscribe(data => {
      this.filteredData = data;
      this.ordersCollectiondata = data;
      console.log('Test', this.ordersCollectiondata);
    });
    this.getOrders();
  }

  async getOrders() {
    try {
      const orders = await this.orderService.getOrder();
      console.log('Orders:', orders);
      // Use the retrieved data as needed in your component
      this.filteredData = orders;
      this.ordersCollectiondata = orders;
    } catch (error) {
      // Handle the error appropriately
    }
  }

  openDialog(item: any) {
    let dialogRef = this.dialog.open(DialogAddOrderComponent, {

      data: item,
    });
    dialogRef.afterClosed().subscribe(result => {
      // Handle the data received from the dialog
      console.log('Dialog closed with data:', result);
    });
  }

  async delete(docId: string) {
    await this.orderService.deleteOrder(docId);
    this.getOrders();
  }

  updateFilteredData() {
    if (this.searchQuery.trim() === '') {
      this.filteredData = [...this.ordersCollectiondata]; // Copy all data when search query is empty
    } else {
      this.filteredData = this.ordersCollectiondata.filter((item: any) => {
        // Customize this logic based on your search requirements
        return (
          item.Item.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          item.Name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          item.Amount.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          item.Status.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          item.Country.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          item.Date.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      });
    }
  }

  onSearch() {
    this.updateFilteredData();
    console.log(this.filteredData, ' filter data');
  }


}
