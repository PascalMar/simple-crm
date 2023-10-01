import { Component, OnInit, inject, ViewChild } from '@angular/core';
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
  ApexGrid
} from 'ngx-apexcharts';
import { OrdersService } from '../shared/orders.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  grid: ApexGrid;
  fill: ApexFill;
  title: ApexTitleSubtitle;
  labels: any;
  legend: ApexLegend;
  colors: string[];
};

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

export type ChartOptions2 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  grid: ApexGrid;
  colors: string[];
  legend: ApexLegend;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public chartOptions: any;
  public chartOptions1: any;
  public chartOptions2: any;
  public chartSeries: any;

  totalEmployees: any;
  Designation: any = [];
  groupedEmployees: any = [];
  groupedDesignations: any = [];
  designationCounts: any = [];

  totalOrdersByCountry: any;
  Country: any = [];
  groupedOrdersByCountry: any = [];
  groupedCountrys: any = [];
  countrycounts: any = [];

  totalOrders: any;
  Date: any = [];
  groupedOrders: any = [];
  groupedDates: any = [];
  datescounts: any = [];










  // public chartSeries1: number[] = [44, 55, 41, 17, 15];
  // public chartLabels: string[] = ['A', 'B', 'C', 'D', 'E'];

  constructor(private empService: EmployService, private orderService: OrdersService) {


    this.chartOptions2 = {
      series: [
        {
          name: "distibuted",
          data: [21, 22, 10, 28]
        }
      ],
      chart: {
        height: 350,
        type: "bar",
        events: {
          // click: function(chart, w, e) {
          //   // console.log(chart, w, e)
          // }
        }
      },
      colors: [
        "#008FFB",
        "#00E396",
        "#FEB019",
        "#FF4560",
        "#775DD0",
        "#546E7A",
        "#26a69a",
        "#D10CE8"
      ],
      plotOptions: {
        bar: {
          columnWidth: "45%",
          distributed: true
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      grid: {
        show: false
      },
      xaxis: {
        categories: this.groupedCountrys,
        labels: {
          style: {
            colors: [
              "#008FFB",
              "#00E396",
              "#FEB019",
              "#FF4560",

            ],
            fontSize: "12px"
          }
        }
      }
    };
    // pie chart
  }

  ngOnInit(): void {
    this.getEmployees();
    this.getOrders();
    this.getOrderByCountry();
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
                formatter: (val: any) => {
                  return val + ' orders';
                }
              },
              total: {
                show: true,
                showAlways: false,
                formatter: (w: any) => {
                  if (this.totalOrders) {
                    return this.totalOrders 
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
      labels: this.groupedDates,
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
                    return this.totalEmployees 
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
      labels: this.groupedDesignations,
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
      // console.log('Employees:', employees);
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
    // console.log('Designation:', this.groupedDesignations);
    // console.log('designationCounts:', this.designationCounts);
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
        this.groupedDates.push(Date);
        this.datescounts.push(this.groupedOrders[Date]);
      }
    }
    console.log('date:', this.groupedOrders);
    // console.log('dateCounts:', this.datescounts);

  }

  async getOrderByCountry() {
    try {
      const ordersByCountry = await this.orderService.getOrder();
      console.log('Orders by Country:', ordersByCountry);
      this.totalOrdersByCountry = ordersByCountry.length;

      ordersByCountry.forEach(orderByCountry => {
        const Country = orderByCountry.Country;
        this.groupedOrdersByCountry[Country] = (this.groupedOrdersByCountry[Country] || 0) + 1;
      });

    } catch (error) { }
    for (const Country in this.groupedOrdersByCountry) {
      if (this.groupedOrdersByCountry.hasOwnProperty(Country)) {
        this.groupedCountrys.push(Country);
        this.countrycounts.push(this.groupedOrdersByCountry[Country]);
      }
    }
    console.log('country', this.groupedOrdersByCountry);
    console.log('countrycounts:', this.countrycounts);


  }



















}
