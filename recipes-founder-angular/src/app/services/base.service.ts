import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

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

  protected getOne<T>(url: string):any{
    return this.http.get(url).pipe(
      catchError(error => {
          let errorMsg: string;
         debugger
         throwError(error);
         return error;
      })
  );
}

private getServerErrorMessage(error: HttpErrorResponse): string {
switch (error.status) {
case 404: {
  return `Not Found: ${error.message}`;
}
case 403: {
  return `Access Denied: ${error.message}`;
}
case 500: {
  return `Internal Server Error: ${error.message}`;
}
default: {
  return `Unknown Server Error: ${error.message}`;
}

}
}

}
