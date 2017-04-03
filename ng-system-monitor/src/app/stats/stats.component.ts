import {Component} from '@angular/core';
import {StatsService} from '../_services';
import {Series} from '../_helpers/cls/series';

declare let moment: any;

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})

export class StatsComponent {
  stats: any[] = [];
  labels: any[];
  isLoadStats: boolean = false;
  isNoData: boolean = false;
  private seriesCpu = new Series('Cpu used');
  private seriesMemory = new Series('Memory free');
  
  constructor(private statsService: StatsService) {
  }
  
  private addStat(stat: any) {
    let that = this;
    that.labels.push(moment(stat._id * 60000).format('YYYY-MM-DD HH:mm'));
    that.seriesCpu.add(stat.cpuPer);
    that.seriesMemory.add(stat.memoryFreePer);
  }
  
  getStats(ev) {
    let that = this;
    
    that.isLoadStats = true;
    that.isNoData = false;
    
    that.statsService.stats(ev)
      .subscribe(stats => {
        that.isLoadStats = false;
        that.stats = stats || [];
        that.isNoData = !that.stats.length;
        
        if (that.isNoData) {
          return;
        }
        
        that.labels = [];
        that.seriesCpu.clear();
        that.seriesMemory.clear();
        
        let len = that.stats.length;
        let stat = that.stats[0];
        
        if (len > 1) {
          for (let i = 1; i < len; ++i) {
            stat = that.stats[i];
            that.addStat(stat);
            let minute = stat._id;
            
            if (i !== len - 1) {
              let nextMinute = minute + 60;
              let nextStat = that.stats[i + 1];
              
              if (nextStat._id > nextMinute) {
                
                while (nextMinute < nextStat._id) {
                  that.addStat({
                    _id: nextMinute,
                    cpuPer: 0,
                    memoryFreePer: 0
                  });
                  nextMinute += 60;
                }
              }
            }
          }
        } else {
          that.addStat(stat);
        }
        
        that.stats = [
          that.seriesCpu.result(),
          that.seriesMemory.result(),
        ];
        
      }, e => {
        that.isLoadStats = false;
        that.isNoData = true;
      });
  }
}
