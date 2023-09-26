import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddEmployeesComponent } from '../dialog-add-employees/dialog-add-employees.component';
import { EmployService } from '../shared/employ.service';
import { DocumentData, QuerySnapshot } from '@firebase/firestore';
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
    this.getOrder();
    this.orderService.obsr_UpdatedSnapshot.subscribe((snapshot) => {
      this.updateOrderCollection(snapshot);
    })
  }

  openDialog(item: any) {
    this.dialog.open(DialogAddOrderComponent, {
      data: item,
    });
  }

  async delete(docId: string) {
    await this.orderService.deleteOrder(docId);
  }

  async getOrder() {
    const snapshot = await this.orderService.getOrder();
    this.updateOrderCollection(snapshot);
    this.filteredData = this.ordersCollectiondata;
  }

  updateOrderCollection(snapshot: QuerySnapshot<DocumentData>) {
    this.ordersCollectiondata = [];
    snapshot.docs.forEach((order) => {
      this.ordersCollectiondata.push({ ...order.data(), id: order.id });
    })
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
          item.id.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          item.Location.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
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
