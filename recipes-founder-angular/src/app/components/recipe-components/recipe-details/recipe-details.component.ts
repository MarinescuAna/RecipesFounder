import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeDetailsModule } from 'src/app/modules/recipe-details.module';
import { StepImageModule } from 'src/app/modules/steps-image.module';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: [
    './recipe-details.component.css'
  ]
})

export class RecipeDetailsComponent implements OnInit {

  private id: any;
  tags: string[] = [];
  recipe = new RecipeDetailsModule();
  steps:string;
  noSteps=true;
  constructor(private route: ActivatedRoute, private recipService: RecipeService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        this.id = params;
        this.GetRecipeInformation();
        this.GetSteps();
      }
    );
  }

  private GetSteps(): void {
    debugger
    this.recipService.GetStepsImage(this.id.id).subscribe(cr => {
      this.steps = (cr as StepImageModule).url;
      this.noSteps=false;
    });
  }
  private GetRecipeInformation(): void {
    debugger
    this.recipService.GetRecipeInformation(this.id.id).subscribe(cr => {
      this.recipe = cr as RecipeDetailsModule;
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
    });
  }

}
