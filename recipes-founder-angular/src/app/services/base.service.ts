import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  private http: HttpClient;

  constructor(
    private injector: Injector
  ) {
    this.http=this.injector.get(HttpClient);
   }


  protected getMany<T>(url: string): Observable<T[]>{
    return this.http.get<[]>(url,httpOptions)
    .pipe(map((response) => {
      return response as T[];
    }));
  }

  protected getOne<T>(url: string):Observable<T>{
    return this.http.get(url)
      .pipe(map((response) => {
        return response as T;
      }));
 }

}
