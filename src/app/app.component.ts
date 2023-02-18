import { Component } from '@angular/core';
import { LoaderService } from './loader/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [LoaderService]
})
export class AppComponent {
  public title = 'library management system';

  constructor(public loaderService: LoaderService) { }
}
