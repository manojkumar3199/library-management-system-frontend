import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private status: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public currentStatus = this.status.asObservable();

  public setStatus(status: boolean): void {
    this.status.next(status);
  }

  constructor() { }

}