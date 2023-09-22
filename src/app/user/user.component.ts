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




  constructor(public dialog: MatDialog, public customerService: CustomerService) { }

  ngOnInit(): void {
    this.getCustomer();
    this.customerService.obsr_UpdatedSnapshot.subscribe((snapshot) => {
      this.updateCustomerCollection(snapshot);
    })
  }

  openDialog(item: any) {
    this.dialog.open(DialogAddUserComponent, {
      data: item,
    });
  }

  async delete(docId: string) {
    await this.customerService.deleteCustomer(docId);
  }

  async getCustomer() {
    const snapshot = await this.customerService.getCustomer();
    this.updateCustomerCollection(snapshot);
    console.log(this.customerCollectiondata, ' data');
  }

  updateCustomerCollection(snapshot: QuerySnapshot<DocumentData>) {
    this.customerCollectiondata = [];
    snapshot.docs.forEach((cus) => {
      this.customerCollectiondata.push({ ...cus.data(), id: cus.id });
    })
  }

  updateFilteredData() {
    this.filteredData = this.customerCollectiondata.filter((item: any) => {
      // Customize this logic based on your search requirements
      return (
        item.Name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        item.Designation.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        item.email.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        item.Country.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        item.City.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        item.Hiredate.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        item.Reportto.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    });
  }

  onSearch() {
    this.updateFilteredData();
    console.log(this.filteredData, ' filter data');
  }

}
