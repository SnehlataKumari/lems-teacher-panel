import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label,Color, MultiDataSet } from 'ng2-charts';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{
        
      }],
      
      yAxes: [{
          ticks: {
            min: 0,
            max : 600,
            beginAtZero: true,
          callback: label => `$ ${label}`
          },
          id: 'y-axis-0',
          position: 'left',
        }]
       
    },
  };
  //barchart//
    public barChartLabels: Label[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'jul','Aug','Sept','Oct','Nov','Dec'];
    public barChartType: ChartType = 'bar';
    public barChartLegend = true;
    public barChartPlugins = [];
  
    public barChartData: ChartDataSets[] = [
      { data: [200, 180, 150, 185, 250, 200, 200, 400, 250, 350, 250,300], label: 'Series A' },
    ];
    public barChartColors: Color[] = [
      { backgroundColor: '#ddd' }
    ]
  
  constructor() { }

  ngOnInit(): void {
  }

}
