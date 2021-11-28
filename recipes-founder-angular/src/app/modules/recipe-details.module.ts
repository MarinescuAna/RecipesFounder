import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngredientModule } from './ingredients.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class RecipeDetailsModule { 
  title: string;
  image: string;
  servings:number;
  readyInMinutes: number;
  aggregateLikes:number;
  healthScore:number;
  glutenFree:boolean;
  ketogenic:boolean;
  vegan:boolean;
  vegetarian:boolean;
  summary:string;
  extendedIngredients: IngredientModule[];
}
