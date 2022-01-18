
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RecipeCreateModule } from 'src/app/modules/recipe-create.module';
import { RecipeService } from 'src/app/services/recipe.service';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.css']
})
export class CreateRecipeComponent implements OnInit {
  allTags: string[] = [];
  fileName: string;
  imageOverview: string;
  imageSteps: string;
  ingredients: string[] = [];
  formRecipe = new FormGroup({
    title: new FormControl(''),
    servings: new FormControl(''),
    readyInMinutes: new FormControl(''),
    healtyScore: new FormControl(''),
    summary: new FormControl(''),
    preparationDescription:new FormControl('')
  });

  constructor(private service: RecipeService, private authService:AuthService) {
  }

  ngOnInit(): void {
    this.allTags = [
      'GlutenFree',
      'Ketogenic',
      'Vegan',
      'Vegetarian'
    ];
  }

  remove(tag: string): void {
    const index = this.allTags.indexOf(tag);

    if (index >= 0) {
      this.allTags.splice(index, 1);
    }
  }

  addIngredient(ing: HTMLInputElement) {
    if (ing.value.trim() != '') {
      this.ingredients.push(ing.value);
    }
  }

  onSubmit(): void {
    let recipe = new RecipeCreateModule();
    recipe.extendedIngredients = this.ingredients;
    recipe.image = this.imageOverview;
    recipe.imageSteps = this.imageSteps;
    recipe.title = this.formRecipe.value.title;
    recipe.servings = this.formRecipe.value.servings;
    recipe.readyInMinutes = this.formRecipe.value.readyInMinutes;
    recipe.healthScore = this.formRecipe.value.healtyScore;
    recipe.vegan = false;
    recipe.glutenFree = false;
    recipe.ketogenic = false;
    recipe.vegetarian = false;
    recipe.preparationDescription=this.formRecipe.value.preparationDescription;
    this.allTags.forEach(element => {
      if (element == 'Vegan') {
        recipe.vegan = true;
      }
      if (element == 'GlutenFree') {
        recipe.glutenFree = true;
      }
      if (element == 'Ketogenic') {
        recipe.ketogenic = true;
      }
      if (element == 'Vegetarian') {
        recipe.vegetarian = true;
      }
    });
    recipe.summary = this.formRecipe.value.summary;debugger
    recipe.email=this.authService.decodeJWToken('unique_name')

    this.service.CreateRecipe(recipe).subscribe(
      cr => {
        this.service.alertService.showSucces("Success!");
      },
      err=>{
        this.service.alertService.showError(err.message);
      }
    );
  }

  onFileChange(event, isSteps: boolean): void {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      this.fileName = event.target.files[0].name;
      if (this.fileName.split('.')[1] === 'jpg' || this.fileName.split('.')[1] === 'png' || this.fileName.split('.')[1] === 'jpeg') {
        const [file] = event.target.files;
        reader.readAsDataURL(file);
        reader.onload = () => {
          if (isSteps) {
            this.imageSteps = 'data:image/' + this.fileName.split('.')[1] + ';base64,' + reader.result?.toString().split(',')[1];
          } else {
            this.imageOverview = 'data:image/' + this.fileName.split('.')[1] + ';base64,' + reader.result?.toString().split(',')[1];
          }
        };
      } else {
        this.service.alertService.showError('Invalid file! You can only send jpg, png and jpeg files!');
      }
    }
  }
}
