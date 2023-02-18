import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, Observable } from 'rxjs';

@Injectable()
export class LoaderService implements HttpInterceptor {

  private status: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public currentStatus = this.status.asObservable();

  public setStatus(status: boolean): void {
    this.status.next(status);
  }


  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.setStatus(true);
    console.log(this.status.getValue());
    return next.handle(req).pipe(
      finalize(() => this.setStatus(false))
    );
  }
}