import { Injectable, Injector } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})

export class RecipeService extends BaseService{
  
  constructor(injector: Injector) {
    super(injector);
  }

  public GetRecipes():any{ 
    let url=`${environment.urlApiSpoonacular}complexSearch?apiKey=${environment.apiSpoonacularKey}`;
    return super.getMany<any>(url);
  }

  public GetRecipeCard(id:string):any{
    let url = `${environment.urlApiSpoonacular}${id}/card?apiKey=${environment.apiSpoonacularKey}`;
    return super.getOne(url);
  }

  public GetRecipeInformation(id:string):any{
    let url = `${environment.urlApiSpoonacular}${id}/information?includeNutrition=false&apiKey=${environment.apiSpoonacularKey}`;
    return super.getOne(url);
  }
  
  public GetRecipeIngredients(id:string):any{
    let url = `${environment.urlApiSpoonacular}${id}/summary?apiKey=${environment.apiSpoonacularKey}`;
    return super.getOne(url);
  }

  public GetSteps(id:string):any{
    let url = `${environment.urlApiSpoonacular}${id}/analyzedInstructions?apiKey=${environment.apiSpoonacularKey}`;
    return super.getOne(url);
  }

  public GetStepsImage(id:string):any{
    let url = `${environment.urlApiSpoonacular}${id}/card?backgroundColor=f0ffff&apiKey=${environment.apiSpoonacularKey}`;
    return super.getOne(url);
  }
}
