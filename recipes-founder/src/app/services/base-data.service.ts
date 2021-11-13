import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {  Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AlertService } from './alert.service';
import { BadRequestError } from '../handler-error/bad-request-error';
import { MethodNotAllowedError } from '../handler-error/method-not-allowed-error';
import { NotFoundError } from '../handler-error/not-found-error';
import { ConflictError } from '../handler-error/conflict-error';
import { ForbiddenError } from '../handler-error/forbidden-error';
import { UnauthorizedError } from '../handler-error/unauthorized-error';
import { AppErrorHandler } from '../handler-error/app-error-handler';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class BaseDataService {

  private http: HttpClient;
  private appHandler: AppErrorHandler;
  public alertService: AlertService;
  constructor(
    private injector: Injector
  ) {
    this.http=this.injector.get(HttpClient);
    this.alertService=this.injector.get(AlertService);
    this.appHandler=this.injector.get(AppErrorHandler);
   }

   protected getAll<T>(): Observable<T[]>{
     return this.getMany<T>('');
   }
/*    this.url=`${environment.baseApiUrl}${url}`;
     url=`${this.url}/${path}`;*/
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

   protected post<T>(path: string, data: any,url:string): Observable<T>{
     const body = JSON.stringify(data);
     return this.http.post(url, body, httpOptions)
        .pipe(map((response)=>{
          return response as T;
        })).pipe(catchError((err: HttpErrorResponse) => {
          return this.handleError(err);
        }));
   }

   // tslint:disable-next-line: typedef
   protected update(id: any, entity: any, url:string) {
    const body = JSON.stringify(entity);
    return this.http.put(url, body, httpOptions).pipe(map((response) => {
      return response;
    })).pipe(catchError(
        (err: HttpErrorResponse) => {
          return this.handleError(err);
        }));
  }

  protected add<T>(entity: any, url:string): Observable<T> {
    const body = JSON.stringify(entity);
    return this.http.post<T>(url, body, httpOptions).pipe(map((response) => {
      return response as T;
    })).pipe(catchError(
      (err: HttpErrorResponse) => {
        return this.handleError(err);
      }));
  }

  protected delete(id: string, path: string, url:string): Observable<any> {
    return this.http.delete<any>(url, httpOptions).pipe(map((response) => {
      return response;
    })).pipe(catchError(
      (err: HttpErrorResponse) => {
        return this.handleError(err);
      }));
  }


  protected handleError(error: any){
    switch (error.status) {
      case 400: {
        throw this.appHandler.handleError(new BadRequestError(error.error));
      }
      case 405: {
        throw this.appHandler.handleError(new MethodNotAllowedError(error.error));
      }
      case 404: {
        throw this.appHandler.handleError(new NotFoundError(error.error));
      }
      case 409: {
        throw this.appHandler.handleError(new ConflictError(error.error));
      }
      case 403: {
        throw this.appHandler.handleError(new ForbiddenError(error.error));
      }
      case 401: {
        throw this.appHandler.handleError(new UnauthorizedError(error.error));
      }
      case 500: {
        this.alertService.showError('The server encountered an internal error and was unable to complete your request. ' +
          'Please contact the administrators and inform them of the time the error occurred and anything you might have done that may have caused the error.');
      }
    }
    this.alertService.showError(error.message, 'Cannot connect to the API');
     return Observable.throw;
   }
}
