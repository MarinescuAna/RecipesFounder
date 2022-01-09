
import { Inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})

export class TokenModule {
  public accessToken:string;
  public accessTokenExp:string;
  constructor(@Inject(String) accessToken:string, @Inject(String) accessTokenExp:string){
    this.accessToken=accessToken;
    this.accessTokenExp=accessTokenExp;
  }
}
