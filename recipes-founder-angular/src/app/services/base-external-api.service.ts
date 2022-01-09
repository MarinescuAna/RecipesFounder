import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { AlertService } from './alert.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class BaseExternalApiService {
  private http: HttpClient;
  public alertService: AlertService;

  constructor(
    private injector: Injector
  ) {
    this.http=this.injector.get(HttpClient);
    this.alertService=this.injector.get(AlertService);
   }
   
   protected getMany<T>(url: string): Observable<T[]>{
    return this.http.get<[]>(url,httpOptions)
    .pipe(map((response) => {
      return response as T[];
    })).pipe(catchError((error: HttpErrorResponse)=>{
      return this.handleError(error);
    }));
  }
  protected getOne<T>(url: string):Observable<T>{
      return this.http.get(url)
        .pipe(map((response) => {
          return response as T;
        })).pipe(catchError((err: HttpErrorResponse) => {
          return this.handleError(err);
        }));
   }

protected handleError(error: any){
  return throwError(error.message);
 }
 


}
