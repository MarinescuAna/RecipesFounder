import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeOverviewInfoModule } from './recipe-overview-info.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class RecipeModule { 
  number: number;
  results:RecipeOverviewInfoModule[];
}
