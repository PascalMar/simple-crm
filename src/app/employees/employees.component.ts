import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddEmployeesComponent } from '../dialog-add-employees/dialog-add-employees.component';
import { EmployService } from '../shared/employ.service';

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
    this.empService.getData().subscribe(data => {
      this.filteredData = data;
      this.empCollectiondata = data;
      console.log('Test', this.empCollectiondata);
    });
    this.getEmployees();
  }

  async getEmployees() {
    try {
      const employees = await this.empService.getEmployees();
      console.log('Employees:', employees);
      // Use the retrieved data as needed in your component
      this.filteredData = employees;
      this.empCollectiondata = employees;
    } catch (error) {
      // Handle the error appropriately
    }
  }

  openDialog(item: any) {
    let dialogRef = this.dialog.open(DialogAddEmployeesComponent, {

      data: item,
    });
    dialogRef.afterClosed().subscribe(result => {
      // Handle the data received from the dialog
      console.log('Dialog closed with data:', result);
    });
  }

  async delete(docId: string) {
    await this.empService.deleteEmployee(docId);
    this.getEmployees();
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
