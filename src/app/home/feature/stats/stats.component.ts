import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Stats } from 'src/app/shared/data-access/stats';
import { StoreService } from 'src/app/shared/store/store.service';
import { StatsService } from '../../data-assess/stats.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  public error: HttpErrorResponse | null = null;
  public stats$!: Observable<Stats>;

  constructor(private statsService: StatsService, private storeService: StoreService) { }

  ngOnInit(): void {
    if (!this.storeService.statsLoaded) {
      this.statsService.getStats().subscribe({
        next: data => {
          console.log(data);
          this.storeService.loadStats(data);
        },
        error: error => {
          console.log(error);
          this.error = error;
        }
      });
    }
    this.stats$ = this.storeService.currentStats$;
  }

}
