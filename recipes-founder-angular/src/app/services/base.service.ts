import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable, Injector } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AlertService } from './alert.service';


export class HttpInterceptorParams extends HttpParams {
  constructor(
    public interceptorConfig?: HttpInterceptorConfig,
    params?: { [param: string]: string | string[] }
  ) {
    super({ fromObject: params });
  }
}

export interface HttpInterceptorConfig {
  hideLoading?: boolean;
  successMessage?: string;
  showSuccessMessage?: boolean;
}

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  private http: HttpClient;
  public alertService: AlertService;
  public url:string;
  constructor(
    private injector: Injector,
    @Inject(String) url: String
  ) {
    this.http=this.injector.get(HttpClient);
    this.alertService=this.injector.get(AlertService);
    this.url=`${environment.baseApiUrl}${url}`;
   }

 /*   protected getAll<T>(): Observable<T[]>{
     return this.getMany<T>('');
   }

   protected getMany<T>(path: string): Observable<T[]>{
     const url=`${this.url}/${path}`;
     return this.http.get<[]>(url,httpOptions)
     .pipe(map((response) => {
       return response as T[];
     })).pipe(catchError((error: HttpErrorResponse)=>{
       return this.handleError(error);
     }));
   }

   protected getOne<T>(url: string):Observable<T>{
      const path=`${this.url}/${url}`;
      return this.http.get(path)
        .pipe(map((response) => {
          return response as T;
        })).pipe(catchError((err: HttpErrorResponse) => {
          return this.handleError(err);
        }));
   }

   // tslint:disable-next-line: typedef
   protected update(id: any, entity: any) {
    const body = JSON.stringify(entity);
    const url = `${this.url}/${id}`;
    return this.http.put(url, body, httpOptions).pipe(map((response) => {
      return response;
    })).pipe(catchError(
        (err: HttpErrorResponse) => {
          return this.handleError(err);
        }));
  }

  protected add<T>(entity: any): Observable<T> {
    const body = JSON.stringify(entity);
    const url = `${this.url}`;
    return this.http.post<T>(url, body, httpOptions).pipe(map((response) => {
      return response as T;
    })).pipe(catchError(
      (err: HttpErrorResponse) => {
        return this.handleError(err);
      }));
  }

  protected delete(id: string, path: string): Observable<any> {
    const url = `${this.url}/${path}?${id}`;
    return this.http.delete<any>(url, httpOptions).pipe(map((response) => {
      return response;
    })).pipe(catchError(
      (err: HttpErrorResponse) => {
        return this.handleError(err);
      }));
  }
 */
  public post(
    path: string,
    data: any
  ): any {
    const url =`${this.url}/${path}`;
    const body = JSON.stringify(data);

    return this.http.post(url, body,httpOptions);
  }

}


