import { RecipeOverviewInfoModule } from './../../../modules/recipe-overview-info.module';
import { Component, OnInit } from '@angular/core';
import { RecipeModule } from 'src/app/modules/recipe.module';
import { RecipeService } from 'src/app/services/recipe.service';
import { RecipeGetCardModule } from 'src/app/modules/recipe-get-card.module';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  list = new RecipeModule();
  filteredList: RecipeOverviewInfoModule[]=[];
  constructor(private serviceRecipe: RecipeService) {
  }

  onFilter(text){
    console.log(text.value);
    this.filteredList=this.list.results;
    this.filteredList = this.filteredList.filter(
      element => 
        element.title.toLowerCase().includes(text.value.toLowerCase()));
  }

  ngOnInit(): void {
    this.list.results=[];
    this.GetUsersRecipies();
    this.GetExternalRecipies();

  }

  private GetExternalRecipies():void{
    this.serviceRecipe.GetRecipes().subscribe(cr => {
      (cr as RecipeModule).results.forEach(element => {
        element.isExternal = true;
        this.list.results.push(element);      
      });
      this.filteredList=this.list.results;
    },
      err => {
        this.serviceRecipe.alertService.showError(err.message);
      });;
  }

  private GetUsersRecipies():void{
    this.serviceRecipe.GetPublicRecipies().subscribe(cr => {
      let list2 = cr as RecipeGetCardModule[];
      list2.forEach(element =>{
        let newRecipe = new RecipeOverviewInfoModule;
        newRecipe.id=element.id;
        newRecipe.image=element.image;
        newRecipe.isExternal=false;
        newRecipe.title=element.title;
        this.list.results.push(newRecipe);
      });
      this.filteredList=this.list.results;
    },
      err => {
        this.serviceRecipe.alertService.showError(err.message);
      });;
  }
}
