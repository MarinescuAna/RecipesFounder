import { Injectable, Injector } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService extends BaseService{

  url:string;
  
  constructor(injector: Injector) {
    super(injector);
  }

  public GetRecipes():any{ 
    this.url=`${environment.urlApiSpoonacular}complexSearch?apiKey=${environment.apiSpoonacularKey}`;
    return super.getMany<any>(this.url);
  }

  public GetRecipeCard(id:string):any{
    this.url = `${environment.urlApiSpoonacular}${id}/card?apiKey=${environment.apiSpoonacularKey}`;
    return super.getOne(this.url);
  }
}
