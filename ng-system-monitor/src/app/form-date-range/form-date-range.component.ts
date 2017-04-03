import {Component, OnInit, AfterViewInit, Output, EventEmitter} from '@angular/core';
import {DateRange} from '../_models/date-range';

declare let $: any;
declare let moment: any;

@Component({
  moduleId: module.id,
  selector: 'form-date-range',
  templateUrl: './form-date-range.component.html',
  styleUrls: ['./form-date-range.component.css']
})

export class FormDateRangeComponent implements AfterViewInit {
  @Output() selectedStatsRange: EventEmitter<any> = new EventEmitter();
  model: DateRange = {
    from: '',
    to: ''
  };
  isEmptyDateFrom: boolean = false;
  isEmptyDateTo: boolean = false;
  constructor() {
  }
  
  ngAfterViewInit() {
    let format = 'YYYY-MM-DD';
    let evChange = 'dp.change';
    let dataLabel = 'DateTimePicker';
    let $dateFrom = $("#dateFrom");
    let $dateTo = $('#dateTo');
    let dateFrom = new Date();
    let that = this;
    
    dateFrom.setDate(dateFrom.getDate() - 5);
    
    $dateFrom.datetimepicker({
      format: format,
      defaultDate: dateFrom
    }).on(evChange, (ev) => {
      let d = ev.date;
      that.model.from = d ? moment(d._d).format(format) : '';
      that.isEmptyDateFrom = !that.model.from.length;
    });
    
    $dateTo.datetimepicker({
      format: format,
      defaultDate: new Date()
    }).on(evChange, (ev) => {
      let d = ev.date;
      that.model.to = d ? moment(d._d).format(format) : '';
      that.isEmptyDateTo = !that.model.to.length;
    });
    
    that.model.from = $dateFrom.data(dataLabel).date()._i;
    that.model.to = $dateTo.data(dataLabel).date()._i;
    
  }
  
  submit() {
    let that = this;
    
    if (that.isEmptyDateTo || that.isEmptyDateFrom) {
      return;
    }
    
    that.selectedStatsRange.emit(that.model);
    
  }
}
