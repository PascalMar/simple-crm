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
import { CustomerService } from '../shared/customer.service';

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
  fill: ApexFill;
  title: ApexTitleSubtitle;
  labels: any;
  legend: ApexLegend;
  colors: string[];
};

export type ChartOptions3 = {
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
  public chartOptions1: any;
  public chartOptions2: any;
  public chartOptions3: any;
  public chartOptions4: any;
  public chartSeries: any;

  totalEmployees: any;
  Designation: any = [];
  groupedEmployees: any = [];
  groupedDesignations: any = [];
  designationCounts: any = [];

  totalOrders: any;
  Date: any = [];
  groupedOrders: any = [];
  groupedDates: any = [];
  datescounts: any = [];

  totalOrdersByCountry: any = [];
  Country: any = [];
  groupedOrdersByCountry: any = [];
  groupedCountrys: any = [];
  countrycounts: any = [];

  totalCustomersByCountry: any = [];
  customerCountry: any = [];
  groupedCustomersByCountry: any = [];
  groupedCustomers: any = [];
  customerscounts: any = [];

  public updateCharts() {

    this.chartOptions = {
      series: this.datescounts,
      chart: {
        height: 360,
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
                  return val;
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
        height: 360,
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
                  return val;
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

    this.chartOptions2 = {
      series: this.countrycounts,
      chart: {
        height: 360,
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
                  return val;
                }
              },
              total: {
                show: true,
                showAlways: false,
                formatter: (w: any) => {
                  if (this.totalOrdersByCountry) {
                    return this.totalOrdersByCountry
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
      labels: this.groupedCountrys,
      dataLabels: {
        enabled: false,
      },
      legend: {
        // show: false
      },
    };
    this.chartOptions3 = {
      series: this.customerscounts,
      chart: {
        height: 360,
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
                  return val;
                }
              },
              total: {
                show: true,
                showAlways: false,
                formatter: (w: any) => {
                  if (this.totalCustomersByCountry) {
                    return this.totalCustomersByCountry
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
      labels: this.groupedCustomers,
      dataLabels: {
        enabled: false,
      },
      legend: {
        // show: false
      },
    };

    this.chartOptions4 = {
      series: [
        {
          name: "Orders",
          data: this.datescounts
        }
      ],
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
      title: {
        
        align: "left"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']      
      }
    };
  


  }

  constructor(private empService: EmployService, private orderService: OrdersService, private customerService: CustomerService) {

  }

  async ngOnInit(): Promise<void> {
    await this.getEmployees();
    await this.getOrders();
    await this.getOrderByCountry();
    await this.getCustomersByCountry();


    this.updateCharts();

  }

  async getEmployees(): Promise<void> {
    try {
      const employees = await this.empService.getEmployees();
      // console.log('Employees:', employees);
      // Use the retrieved data as needed in your component
      this.totalEmployees = employees.length;
      employees.forEach(employee => {
        const designation = employee.Designation;
        this.groupedEmployees[designation] = (this.groupedEmployees[designation] || 0) + 1;
      });
      this.updateCharts();
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

  async getOrders(): Promise<void> {
    try {
      const orders = await this.orderService.getOrder();
      // console.log('Orders:', orders);
      // Use the retrieved data as needed in your component
      this.totalOrders = orders.length;
      orders.forEach(order => {
        const Date = order.Date;
        this.groupedOrders[Date] = (this.groupedOrders[Date] || 0) + 1;
      });
      this.updateCharts();
    } catch (error) {
      // Handle the error appropriately
    }
    for (const Date in this.groupedOrders) {
      if (this.groupedOrders.hasOwnProperty(Date)) {
        this.groupedDates.push(Date);
        this.datescounts.push(this.groupedOrders[Date]);
      }
    }
    // console.log('date:', this.groupedOrders);
    // console.log('dateCounts:', this.datescounts);

  }

  async getOrderByCountry(): Promise<void> {
    try {
      const ordersByCountry = await this.orderService.getOrder();
      // console.log('Orders by Country:', ordersByCountry);
      this.totalOrdersByCountry = ordersByCountry.length;

      ordersByCountry.forEach(orderByCountry => {
        const Country = orderByCountry.Country;
        this.groupedOrdersByCountry[Country] = (this.groupedOrdersByCountry[Country] || 0) + 1;
      });
      this.updateCharts();
    } catch (error) { }
    for (const Country in this.groupedOrdersByCountry) {
      if (this.groupedOrdersByCountry.hasOwnProperty(Country)) {
        this.groupedCountrys.push(Country);
        this.countrycounts.push(this.groupedOrdersByCountry[Country]);
      }
    }
  }

  async getCustomersByCountry(): Promise<void> {
    try {
      const customersByCountry = await this.customerService.getCustomer();
      // console.log('Orders by Country:', ordersByCountry);
      this.totalCustomersByCountry = customersByCountry.length;

      customersByCountry.forEach(customerByCountry => {
        const Country = customerByCountry.Country;
        this.groupedCustomersByCountry[Country] = (this.groupedCustomersByCountry[Country] || 0) + 1;
      });
      this.updateCharts();
    } catch (error) { }
    for (const customerCountry in this.groupedCustomersByCountry) {
      if (this.groupedCustomersByCountry.hasOwnProperty(customerCountry)) {
        this.groupedCustomers.push(customerCountry);
        this.customerscounts.push(this.groupedCustomersByCountry[customerCountry]);
      }
    }
  }




















}
