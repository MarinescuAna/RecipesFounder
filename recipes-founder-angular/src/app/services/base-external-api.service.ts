import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, Injector } from '@angular/core';
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
  protected controllerName:String;

  constructor(
    private injector: Injector,
    @Inject(String) controller:String
  ) {
    this.http=this.injector.get(HttpClient);
    this.alertService=this.injector.get(AlertService);
    this.controllerName=controller;
   }

   protected getMany(url: string): any{
    return this.http.get<[]>(url,httpOptions);
  }

  protected getOne(url: string):any{
      return this.http.get(url);
   }

   protected add(entity: any, url:string): any {
    const body = JSON.stringify(entity);
    return this.http.post(url, body, httpOptions);
  }

  // tslint:disable-next-line: typedef
  protected update(url:string, entity: any) {
    const body = JSON.stringify(entity);
    return this.http.put(url, body, httpOptions);
  }

  protected delete(url: string): any {
    return this.http.delete<any>(url, httpOptions);
  }
}
