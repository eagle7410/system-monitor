import {Component, Input, ViewChild} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.css']
})

export class GraphicComponent {
  @Input() stats: any[];
  @Input() labels: any[];
  
  constructor() {
  }
  
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    { // green
      backgroundColor: 'rgba(58, 183, 48, 0.2)',
      borderColor: 'rgba(58, 183, 48, 1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // lite red
      backgroundColor: 'rgba(212, 108, 34, 0.2)',
      borderColor: 'rgba(212, 108, 34, 1))',
      pointBackgroundColor: 'rgba(212, 108, 34, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
  
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';
  
}
