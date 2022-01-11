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
   
   protected getMany(url: string): any{
    return this.http.get<[]>(url,httpOptions);
  }
  protected getOne(url: string):any{
      return this.http.get(url);
   }

 


}
