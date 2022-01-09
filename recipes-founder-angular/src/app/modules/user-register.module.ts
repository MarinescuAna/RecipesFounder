import { Inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})

export class UserRegisterModule {
  public email:string;
  public password:string;
  public fullname:string;
    constructor(@Inject(String) email:string,@Inject(String) password:string, @Inject(String) fullname: string)
    {
      this.email=email;
      this.fullname=fullname;
      this.password=password;
    }
  }
  