import { RecipeOverviewInfoModule } from './../../../modules/recipe-overview-info.module';
import { RecipeGetModule } from './../../../modules/recipe-get.module';
import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { RecipeModule } from 'src/app/modules/recipe.module';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  list = new RecipeModule();

  constructor(private serviceRecipe: RecipeService) {
  }


  ngOnInit(): void {
    this.GetExternalRecipies();
    this.GetUsersRecipies();
  }

  private GetExternalRecipies():void{
    this.serviceRecipe.GetRecipes().subscribe(cr => {
      this.list = cr as RecipeModule;
      return this.list.results.forEach(element => {
        element.isExternal = true
      });
    },
      err => {
        this.serviceRecipe.alertService.showError(err.message);
      });;
  }

  private GetUsersRecipies():void{
    this.serviceRecipe.GetPublicRecipies().subscribe(cr => {
      let list2 = cr as RecipeGetModule[];
      debugger
      list2.forEach(element =>{
        let newRecipe = new RecipeOverviewInfoModule;
        newRecipe.id=element.id;
        newRecipe.image=element.image;
        newRecipe.isExternal=false;
        newRecipe.title=element.title;
        this.list.results.push(newRecipe);
      });
    },
      err => {
        this.serviceRecipe.alertService.showError(err.message);
      });;
  }
}
