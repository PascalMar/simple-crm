import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddEmployeesComponent } from '../dialog-add-employees/dialog-add-employees.component';
import { EmployService } from '../shared/employ.service';
import { DocumentData, QuerySnapshot } from '@firebase/firestore';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  allEmp: any;
  empCollectiondata: any = [];
  searchQuery: string = '';
  filteredData: any = [];
  p: number = 1;


  constructor(public dialog: MatDialog, private empService: EmployService) { }

  ngOnInit(): void {
    this.getEmployees();
    this.empService.obsr_UpdatedSnapshot.subscribe((snapshot) => {
      this.updateEmployeeCollection(snapshot);
    })
  }



  openDialog(item: any) {
    this.dialog.open(DialogAddEmployeesComponent, {
      data: item,
    });
  }

  async delete(docId: string) {
    await this.empService.deleteEmployee(docId);
  }

  async getEmployees() {
    const snapshot = await this.empService.getEmployees();
    this.updateEmployeeCollection(snapshot);
    console.log(this.empCollectiondata, ' data');
    this.filteredData = this.empCollectiondata;
  }

  updateEmployeeCollection(snapshot: QuerySnapshot<DocumentData>) {
    this.empCollectiondata = [];
    snapshot.docs.forEach((emp) => {
      this.empCollectiondata.push({ ...emp.data(), id: emp.id });
    })
  }

  updateFilteredData() {
    if (this.searchQuery.trim() === '') {
      this.filteredData = [...this.empCollectiondata]; // Copy all data when search query is empty
    } else {
      this.filteredData = this.empCollectiondata.filter((item: any) => {
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
  }

  onSearch() {
    this.updateFilteredData();
    console.log(this.filteredData, ' filter data');
  }


}
