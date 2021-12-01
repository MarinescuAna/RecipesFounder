import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { AppErrorHandler } from '../handler-error/app-error-handler';
import { BadRequestError } from '../handler-error/bad-request-error';
import { ConflictError } from '../handler-error/conflict-error';
import { ForbiddenError } from '../handler-error/forbidden-error';
import { MethodNotAllowedError } from '../handler-error/method-not-allowed-error';
import { NotFoundError } from '../handler-error/not-found-error';
import { UnauthorizedError } from '../handler-error/unauthorized-error';
import { AlertService } from './alert.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class BaseExternalApiService {
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
  return throwError(error.message);
 }
 


}
