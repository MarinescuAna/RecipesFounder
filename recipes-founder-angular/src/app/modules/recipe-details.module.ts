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
  id:string;
  title: string;
  image: string;
  servings: number;
  readyInMinutes: number;
  healthScore:  number;
  glutenFree: boolean;
  ketogenic:  boolean;
  vegan:  boolean;
  vegetarian: boolean;
  summary:  string;
  extendedIngredients: IngredientModule[];
}
