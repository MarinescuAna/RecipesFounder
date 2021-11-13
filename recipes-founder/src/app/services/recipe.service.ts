import {  Injectable, Injector } from '@angular/core';
import { environment }  from 'src/environments/environment';
import {BaseDataService} from '..//services/base-data.service';

/*https://api.spoonacular.com/recipes/complexSearch?apiKey=c1c05177c743452189bec365cb7b1ab9
*/
@Injectable({
  providedIn: 'root'
})

export class RecipeService extends BaseDataService{
  
  url=`${environment.urlApiSpoonacular}complexSearch?apiKey=${environment.apiSpoonacularKey}`;
  
  constructor(injector: Injector) {
    super(injector);
  }

  public GetRecipes():any{ 
    return super.getMany<any>(this.url);
  }
}
