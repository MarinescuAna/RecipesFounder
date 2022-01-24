import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { TokenModule } from '../modules/token.module';
import { UserLoginModule } from '../modules/user-login.module';
import {JwtHelperService} from '@auth0/angular-jwt';
import { UserRegisterModule } from '../modules/user-register.module';
import { BaseExternalApiService } from '../services/base-external-api.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseExternalApiService {
  constructor(injector: Injector,private route: Router,private jwtDecode: JwtHelperService, ) {
    super(injector, 'Account');
  }

  private setLocalStorage(token: TokenModule): void {
    localStorage.setItem('access_token', token.AccessToken);
    localStorage.setItem('refresh_token', token.AccessTokenExp);
  }

  public decodeJWToken(tag:string):string{
    const decode=this.jwtDecode.decodeToken(localStorage.getItem('access_token')!);
    return decode==null? "":decode[tag];
  }

  private removeLocalStorage(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  isLogged(): boolean{
    console.log(`Info: is_logged = ${localStorage.getItem('is_logged')}`);  
    console.log(`Info: access_token = ${localStorage.getItem('access_token')}`);  
    console.log(`Info: refresh_token = ${localStorage.getItem('refresh_token')}`);  
    return localStorage.getItem('is_logged')==='true';
  }

  doLogout(): void {
    this.removeLocalStorage();
    localStorage.setItem('is_logged', 'false');
    this.route.navigateByUrl('/home');
  }

  register(user: UserRegisterModule): void {
    let url = `${environment.baseApiUrl}${this.controllerName}/Register`;
    super
    .add(user,url)
    .subscribe(login => {
        this.setLocalStorage(login as TokenModule);
        localStorage.setItem('is_logged', 'true');
        this.route.navigateByUrl('/home');
        this.alertService.showSucces("Success!");
    },
    err => {
      console.log(err);
      this.alertService.showError(err.message);
    });
  }

  login(userCredentials: UserLoginModule): void {
    let url = `${environment.baseApiUrl}${this.controllerName}/Login`;
    super
    .add(userCredentials,url)
    .subscribe(login => {
        this.setLocalStorage(login as TokenModule);
        localStorage.setItem('is_logged', 'true');
        this.route.navigateByUrl('/home');
        this.alertService.showSucces("Success!");
    },
    err => {
      console.log(err);
      this.alertService.showError(err.message);
    });
  }

  public GetUserInformation(email):any{
    let url = `${environment.baseApiUrl}${this.controllerName}/GetUserInformation?email=${email}`;
    return super.getOne(url);
  }
}
