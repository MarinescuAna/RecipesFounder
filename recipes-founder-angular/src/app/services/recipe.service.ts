import { Injectable, Injector } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseExternalApiService } from './base-external-api.service';

@Injectable({
  providedIn: 'root'
})

export class RecipeService extends BaseExternalApiService{
  
  constructor(injector: Injector) {
    super(injector);
  }
  
  public GetRecipes():any{ 
    let url=`${environment.urlApiSpoonacular}complexSearch?apiKey=${environment.apiSpoonacularKey}`;
    return super.getMany(url) ;
  }

  public GetRecipeInformation(id:string):any{
    let url = `${environment.urlApiSpoonacular}${id}/information?includeNutrition=false&apiKey=${environment.apiSpoonacularKey}`;
    return super.getOne(url);
  }

  public GetStepsImage(id:string):any{
    let url = `${environment.urlApiSpoonacular}${id}/card?backgroundColor=f0ffff&apiKey=${environment.apiSpoonacularKey}`;
    return super.getOne(url);
  }
}
