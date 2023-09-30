import { Component, OnInit, inject } from '@angular/core';
import { EmployService } from '../shared/employ.service';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexFill,
  ApexLegend,
} from 'ngx-apexcharts';
import { OrdersService } from '../shared/orders.service';


export type ChartOptions1 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  title: ApexTitleSubtitle;
  labels: any;
  legend: ApexLegend;
  colors: string[];
};

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  title: ApexTitleSubtitle;
  labels: any;
  legend: ApexLegend;
  colors: string[];
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {



  public chartOptions: any;
  public chartSeries: any;
  totalEmployees: any;
  totalOrders: any;
  Designation: any = [];
  Date: any = [];
  groupedEmployees: any = [];
  groupedDesignations: any = [];
  designationCounts: any = [];
  groupedOrders: any = [];
  groupedDates: any = [];
  datescounts: any = [];


  public chartOptions1: any;
  // public chartSeries1: number[] = [44, 55, 41, 17, 15];
  // public chartLabels: string[] = ['A', 'B', 'C', 'D', 'E'];

  constructor(private empService: EmployService, private orderService: OrdersService) {
    // pie chart
  }

  ngOnInit(): void {
    this.getEmployees();
    this.getOrders();
    this.chartOptions = {
      series: this.datescounts,
      chart: {
        height: 350,
        type: 'donut',
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              name: {
                show: false
              },
              value: {
                show: true,
                formatter: (w: any) => {
                  if (this.totalOrders) {
                    return this.totalOrders + ' orders'
                  } return 0
                }
              },
              total: {
                show: true,
                showAlways: false,
                formatter: (w: any) => {
                  return this.totalOrders
                    + ' orders'
                }
              }
            }
          }
        }
      },
      colors: [
        '#37647D',
        '#CE634B',
        '#418B7C',
        '#DDBA6A',
        '#80A473',
        '#DB9B4D',
      ],
      labels: this.Date,
      dataLabels: {
        enabled: false,
      },
      legend: {
        // show: false
      },
    };
    this.chartOptions1 = {
      series: this.designationCounts,
      chart: {
        height: 350,
        type: 'donut',
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              name: {
                show: false
              },
              value: {
                show: true,
                formatter: (val: any) => {
                  return val + ' employees';
                }
              },
              total: {
                show: true,
                showAlways: false,
                formatter: (w: any) => {
                  if (this.totalEmployees) {
                    return this.totalEmployees + ' employees'
                  } return 0
                }
              }
            }
          }
        }
      },
      colors: [
        '#37647D',
        '#CE634B',
        '#418B7C',
        '#DDBA6A',
        '#80A473',
        '#DB9B4D',
      ],
      labels: this.Designation,
      dataLabels: {
        enabled: false,
      },
      legend: {
        // show: false
      },
    };
  }

  async getEmployees() {
    try {
      const employees = await this.empService.getEmployees();
      console.log('Employees:', employees);
      // Use the retrieved data as needed in your component
      this.totalEmployees = employees.length;
      employees.forEach(employee => {
        const designation = employee.Designation;
        this.groupedEmployees[designation] = (this.groupedEmployees[designation] || 0) + 1;
      });
    } catch (error) {
      // Handle the error appropriately
    }
    for (const designation in this.groupedEmployees) {
      if (this.groupedEmployees.hasOwnProperty(designation)) {
        this.groupedDesignations.push(designation);
        this.designationCounts.push(this.groupedEmployees[designation]);
      }
    }
    console.log('Designation:', this.groupedDesignations);
    console.log('designationCounts:', this.designationCounts);
  }

  async getOrders() {
    try {
      const orders = await this.orderService.getOrder();
      console.log('Orders:', orders);
      // Use the retrieved data as needed in your component
      this.totalOrders = orders.length;
      orders.forEach(order => {
        const Date = order.Date;
        this.groupedOrders[Date] = (this.groupedOrders[Date] || 0) + 1;
      });
    } catch (error) {
      // Handle the error appropriately
    }
    for (const Date in this.groupedOrders) {
      if (this.groupedOrders.hasOwnProperty(Date)) {
        this.groupedOrders.push(Date);
        this.datescounts.push(this.groupedOrders[Date]);
      }
    }
    console.log('date:', this.groupedOrders);
    console.log('dateCounts:', this.datescounts);
  }






  // async getOrders() {
  //   try {
  //     const orders = await this.orderService.getOrder();
  //     console.log('Orders:', orders);
  //     // Use the retrieved data as needed in your component
  //     this.totalOrders = orders.length;
  //     for (let i = 0; i <= orders.length; i++) {
  //       this.Date.push(orders[i].Date)
  //     }
  //   } catch (error) {
  //     // Handle the error appropriately
  //   }
  //   console.log('Date', this.Date);

  // }










}
