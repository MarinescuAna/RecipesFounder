import { Injectable, Injector } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RecipeCreateModule } from '../modules/recipe-create.module';
import { BaseExternalApiService } from './base-external-api.service';

export class StepImageModule {
  url: string;
}

@Injectable({
  providedIn: 'root'
})

export class RecipeService extends BaseExternalApiService {

  constructor(injector: Injector) {
    super(injector,'Recipe');
  }

  public GetRecipes(): any {
      let url = `${environment.urlApiSpoonacular}complexSearch?apiKey=${environment.apiSpoonacularKey}`;
      return super.getMany(url);
  }

  public GetRecipeInformation(id: string): any {
    let url = `${environment.urlApiSpoonacular}${id}/information?includeNutrition=false&apiKey=${environment.apiSpoonacularKey}`;
    return super.getOne(url);
  }

  public GetStepsImage(id: string): any {
    let url = `${environment.urlApiSpoonacular}${id}/card?backgroundColor=f0ffff&apiKey=${environment.apiSpoonacularKey}`;
    return super.getOne(url);
  }

  public CreateRecipe(recipe:RecipeCreateModule):any{
    let url = `${environment.baseApiUrl}${this.controllerName}/CreateRecipe`;
    return super.add(recipe,url);
  }

  public GetPublicRecipies(): any{
    let url = `${environment.baseApiUrl}${this.controllerName}/GetPublicRecipies`;
    return super.getMany(url);
  }
  public GetPublicRecipie(id:string): any{
    let url = `${environment.baseApiUrl}${this.controllerName}/GetPublicRecipie?id=${id}`;
    return super.getOne(url);
  }

  public GetUserRecipies(email:string): any{
    let url = `${environment.baseApiUrl}${this.controllerName}/GetUserRecipies?email=${email}`;
    return super.getMany(url);
  }
}
