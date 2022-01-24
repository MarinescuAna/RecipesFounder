import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { TokenModule } from '../modules/token.module';
import { UserLoginModule } from '../modules/user-login.module';
import { BaseService } from '../services/base.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import { UserRegisterModule } from '../modules/user-register.module';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {
  constructor(injector: Injector,private route: Router,private jwtDecode: JwtHelperService, ) {
    super(injector, 'Account');
  }

  private setLocalStorage(token: TokenModule): void {
    localStorage.setItem('access_token', token.AccessToken);
    localStorage.setItem('refresh_token', token.AccessTokenExp);
  }

/*   public UpdateUserInfo(data:any):any{
      return super.update('UpdateUserInfo', data);
  }
  
  public ChangePassword(data:any):any{
    return super.update('ChangePassword', data);
} */
  public decodeJWToken(tag:string):string{
    const decode=this.jwtDecode.decodeToken(localStorage.getItem('access_token')!);
    return decode==null? "":decode[tag];
  }
  
  public decodeJWRefreshToken(tag:string):string{
    const decode=this.jwtDecode.decodeToken(localStorage.getItem('refresh_token')!);
    return decode==null? "":decode[tag];
  }

  private removeLocalStorage(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  getToken(): any {
    if (localStorage.getItem('access_token') !== null) {
      let token = new TokenModule;
      token.AccessToken=localStorage.getItem('access_token')!;
       token.AccessTokenExp=localStorage.getItem('refresh_token')!; 
      return token;
    }
    return null;
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
    super
    .post('Register', user)
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
    super
    .post('Login', userCredentials)
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

}
