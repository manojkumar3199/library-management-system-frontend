import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatsRoutingModule } from './stats-routing.module';
import { MatIconModule } from '@angular/material/icon';

import { StatsComponent } from './stats.component';


@NgModule({
  declarations: [
    StatsComponent
  ],
  imports: [
    CommonModule,
    StatsRoutingModule,
    MatIconModule
  ]
})
export class StatsModule { }
