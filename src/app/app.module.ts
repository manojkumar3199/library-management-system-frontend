import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NavModule } from './layout/ui/nav/nav.module';

import { AppComponent } from './app.component';
import { LoaderService } from './loader/loader.service';


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
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: LoaderService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
