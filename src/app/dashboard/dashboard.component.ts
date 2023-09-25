
import { registerables } from 'node_modules/chart.js';
import { Component, ElementRef, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { Chart, ChartOptions, ChartData } from 'chart.js';
import { EmployService } from '../shared/employ.service';
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit, OnInit {
  @ViewChild('myChart') private chartRef: ElementRef | undefined;
  @ViewChild('myChart1') private chartRef1: ElementRef | undefined;
  labelData: any[] = [];
  realData: any[] = [];
  colorData: any[] = [];
  chartData: any[] = [];
  customerData: any[] = [];
  customerLabelData: any[] = [];
  customerRealData: any[] = [];
  customerColorData: any[] = [];
  private chart: Chart<"bar", number[], string> | undefined;


  constructor(private empService: EmployService) { }

  ngOnInit(): void {
    this.getChartData();
    this.getCustomerData();
  }

  ngAfterViewInit() {
    const ctx: CanvasRenderingContext2D | null = this.chartRef?.nativeElement.getContext('2d');
    const ctx1: CanvasRenderingContext2D | null = this.chartRef1?.nativeElement.getContext('2d');
    this.createChart(this.labelData, this.realData, this.colorData, 'bar', ctx, 'order' );
    this.createChart(this.customerLabelData, this.customerRealData, this.customerColorData, 'doughnut', ctx1, 'customer');
  }



  private createChart(labelData: any, realData: any, colorData: any, type: any, id: any, label:any) {
    if (id) {
      this.chart = new Chart(id, {
        type: type,
        data: {
          labels: labelData,
          datasets: [{
            label: label,
            data: realData,
            backgroundColor: colorData,
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        },
      });
    }

  }



  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  getChartData() {
    this.empService.getChartInfo().subscribe((res: any) => {
      this.chartData = res;
      console.log(this.chartData);

      if (this.chartData !== null) {
        for (let i = 0; i < this.chartData.length; i++) {
          this.labelData.push(this.chartData[i].year);
          this.realData.push(this.chartData[i].amount);
          this.colorData.push(this.chartData[i].colorcode);
        }
      }
    })
      ;
  }

  getCustomerData() {
    this.empService.getCustomerInfo().subscribe((res: any) => {
      this.customerData = res;
      console.log(this.chartData);

      if (this.chartData !== null) {
        for (let i = 0; i < this.customerData.length; i++) {
          this.customerLabelData.push(this.customerData[i].year);
          this.customerRealData.push(this.customerData[i].amount);
          this.customerColorData.push(this.customerData[i].colorcode);
        }
      }
    })
      ;
  }



}
