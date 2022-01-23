import { IngredientModule } from './../../../modules/ingredients.module';
import { RecipeGetModule } from './../../../modules/recipe-get.module';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeDetailsModule } from 'src/app/modules/recipe-details.module';
import { RecipeFullDataModule } from 'src/app/modules/recipe-full-data.module';
import { RecipeOverviewInfoModule } from 'src/app/modules/recipe-overview-info.module';
import { RecipeService, StepImageModule } from 'src/app/services/recipe.service';
import { RatingGetModule } from 'src/app/modules/rating-get.module';
import { RatingService } from 'src/app/services/rating.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: [
    './recipe-details.component.css'
  ]
})
export class RecipeDetailsComponent implements OnInit {

  rating=new RatingGetModule();
  recipe= new RecipeFullDataModule();
  recipeOverviewInfoModule: RecipeOverviewInfoModule;
  tags: string[] = [];
  noSteps = false;
  isExternal=false;
  constructor(private route: ActivatedRoute, private recipService: RecipeService, private ratingService:RatingService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        this.recipeOverviewInfoModule = params as RecipeOverviewInfoModule;
        this.isExternal=this.recipeOverviewInfoModule.isExternal;
        debugger
        console.log(this.recipeOverviewInfoModule.isExternal)
       // if (this.isExternal===false) {
          this.GetPublicRecipe();
       // }else{
      //    this.GetRecipeInformation();
      //  }
        this.ratingService.GetRating(this.recipeOverviewInfoModule.id,this.recipeOverviewInfoModule.isExternal).subscribe(cr =>{
          this.rating=cr as RatingGetModule;
        });
      }
    );
  }

  private GetPublicRecipe(){
    this.recipService.GetPublicRecipie(this.recipeOverviewInfoModule.id).subscribe(cr =>{
        let recipPublic=cr as RecipeGetModule;
        this.SetRecipePublicDetailsModule(recipPublic);
        this.SetTags();
    },
    err => {
      this.GetRecipeInformation();
    });
  }

  private GetRecipeInformation(): void {
    this.recipService.GetRecipeInformation(this.recipeOverviewInfoModule.id).subscribe(cr => {
      this.SetRecipeDetailsModule(cr as RecipeDetailsModule);
      this.SetTags();
    },
      err => {
        this.recipService.alertService.showError(err.message);
      });
      this.recipe.imageSteps='';
      this.recipService.GetStepsImage(this.recipeOverviewInfoModule.id).subscribe(cr => {
      this.recipe.imageSteps = (cr as StepImageModule).url;
    });
  }

  private SetRecipePublicDetailsModule(recipe: RecipeGetModule){
    this.recipe.id=recipe.id;
    this.recipe.image=recipe.image;
    this.recipe.title=recipe.title;
    this.recipe.isExternal=false;
    this.recipe.imageSteps=recipe.imageSteps;
    this.recipe.servings = recipe.servings;
    this.recipe.readyInMinutes = recipe.readyInMinutes;
    this.recipe.healthScore = recipe.healthScore;
    this.recipe.glutenFree = recipe.glutenFree;
    this.recipe.ketogenic = recipe.ketogenic;
    this.recipe.vegan = recipe.vegan;
    this.recipe.vegetarian = recipe.vegetarian;
    this.recipe.summary = recipe.summary;
    this.recipe.username=recipe.username;
    this.recipe.preparationDescription=recipe.preparationDescription;
    this.recipe.extendedIngredients=[];

    recipe.extendedIngredients.forEach(ing =>{
      let ingredient = new IngredientModule;
      ingredient.name=ing;
      this.recipe.extendedIngredients.push(ingredient);
    });
  }


  private SetRecipeDetailsModule(recipe: RecipeDetailsModule): void {
    this.recipe.id = recipe.id;
    this.recipe.title = recipe.title;
    this.recipe.image = recipe.image;
    this.recipe.servings = recipe.servings;
    this.recipe.readyInMinutes = recipe.readyInMinutes;
    this.recipe.healthScore = recipe.healthScore;
    this.recipe.glutenFree = recipe.glutenFree;
    this.recipe.ketogenic = recipe.ketogenic;
    this.recipe.vegan = recipe.vegan;
    this.recipe.vegetarian = recipe.vegetarian;
    this.recipe.summary = recipe.summary;
    this.recipe.username='Spoonacular';
    this.recipe.preparationDescription='';
    this.recipe.extendedIngredients = recipe.extendedIngredients;
    if(this.recipe.extendedIngredients==null || this.recipe.extendedIngredients.length==0){
      this.noSteps=true;
    }
  }

  private SetTags(): void {
    if (this.recipe.vegan === true) {
      this.tags.push("Vegan");
    }
    if (this.recipe.vegetarian === true) {
      this.tags.push("Vegetarian");
    }
    if (this.recipe.glutenFree === true) {
      this.tags.push("Gluten Free");
    }
    if (this.recipe.ketogenic === true) {
      this.tags.push("Ketogenic");
    }
  }
}
