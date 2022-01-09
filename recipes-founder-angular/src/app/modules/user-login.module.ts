import { Inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})

export class UserLoginModule { 
  public email:string;
  public password:string;
   constructor(@Inject(String) email:string,@Inject(String) password:string)
   {
    this.email=email;
    this.password=password;
   }
}
