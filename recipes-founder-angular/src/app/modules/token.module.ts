
import { Inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})

export class TokenModule {
  public AccessToken:string;
  public AccessTokenExp:string;
}
