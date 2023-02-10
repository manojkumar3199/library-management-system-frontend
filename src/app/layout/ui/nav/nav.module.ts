import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NavRoutingModule } from './nav-routing.module';

import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { NavComponent } from './nav.component';


@NgModule({
  declarations: [
    NavComponent
  ],
  imports: [
    CommonModule,
    NavRoutingModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    MatTooltipModule
  ],
  exports: [
    NavComponent
  ]
})
export class NavModule { }
