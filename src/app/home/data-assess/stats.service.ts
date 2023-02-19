import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Stats } from 'src/app/shared/data-access/stats';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  private readonly ROOT_URL = "https://library-management-system-g6oa.onrender.com/api/v1";

  constructor(private http: HttpClient) { }

  public getStats(): Observable<Stats> {
    console.log("loading stats!");
    return this.http.get<Stats>(this.ROOT_URL + "/stats");
  }

}
