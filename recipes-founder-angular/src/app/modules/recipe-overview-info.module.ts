import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class RecipeOverviewInfoModule {
  id:string;
  title: string;
  image: string;
  isExternal:boolean=true;
  isPublic:boolean=true;
  idFavorite:string;
}
