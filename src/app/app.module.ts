import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { NavModule } from './layout/ui/nav/nav.module';

import { APP_BASE_HREF } from '@angular/common';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    NavModule
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: '/library-management-system-frontend-compiled/' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
