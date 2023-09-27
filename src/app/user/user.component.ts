import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { CustomerService } from '../shared/customer.service';
import { DocumentData, QuerySnapshot } from '@firebase/firestore';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  allCustomer: any;
  customerCollectiondata: any = [];
  searchQuery: string = '';
  filteredData: any = [];
  p: number = 1;



  constructor(public dialog: MatDialog, public customerService: CustomerService) { }

  ngOnInit(): void {
    this.customerService.getData().subscribe(data => {
      this.filteredData = data;
      this.customerCollectiondata = data;
      console.log('Test', this.customerCollectiondata);
    });
    this.getOrders();
  }

  async getOrders() {
    try {
      const customer = await this.customerService.getCustomer();
      console.log('Customer:', customer);
      // Use the retrieved data as needed in your component
      this.filteredData = customer;
      this.customerCollectiondata = customer;
    } catch (error) {
      // Handle the error appropriately
    }
  }

  openDialog(item: any) {
    let dialogRef = this.dialog.open(DialogAddUserComponent, {

      data: item,
    });
    dialogRef.afterClosed().subscribe(result => {
      // Handle the data received from the dialog
      console.log('Dialog closed with data:', result);
    });
  } 

  async delete(docId: string) {
    await this.customerService.deleteCustomer(docId);
    this.getOrders();
  }

  updateFilteredData() {
    this.filteredData = this.customerCollectiondata.filter((item: any) => {
      // Customize this logic based on your search requirements
      return (
        item.FirstName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        item.LastName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        item.email.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        item.Street.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        item.ZipCode.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        item.City.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        item.Country.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    });
  }

  onSearch() {
    this.updateFilteredData();
    console.log(this.filteredData, ' filter data');
  }

}
