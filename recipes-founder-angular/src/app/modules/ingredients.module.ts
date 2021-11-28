import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class IngredientModule { 
  name:string;
  original:string;
  measures:{
      metric:{
          amount:number;
          unitShort:string;
      }
  };
}
