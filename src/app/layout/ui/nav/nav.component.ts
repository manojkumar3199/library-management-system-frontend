import { Component, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  @Input("title") public title = "";

  public tabs: string[] = ["categories", "books", "students", "issuebooks"];

  public btns: string[] = ["add", "list"];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private router: Router) { }

  public onSelect(tab: string): void {
    switch (tab) {
      case "add categories":
        this.router.navigate(["/category/add"]);
        break;
      case "list categories":
        this.router.navigate(["/category/list"]);
        break;
      case "add books":
        this.router.navigate(["/book/add"]);
        break;
      case "list books":
        this.router.navigate(["/book/list"]);
        break;
      case "add students":
        this.router.navigate(["/student/add"]);
        break;
      case "list students":
        this.router.navigate(["/student/list"]);
        break;
      case "add issuebooks":
        this.router.navigate(["/issuebook/add"]);
        break;
      case "list issuebooks":
        this.router.navigate(["/issuebook/list"]);
        break;
    }
  }
}
