import { Injector, Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { RatingAddModule } from "../modules/rating-add.module";
import { BaseExternalApiService } from "./base-external-api.service";

@Injectable({
    providedIn:'root'
})
export class RatingService extends BaseExternalApiService{
    constructor(injector: Injector) {
        super(injector, 'Rating');
    }

    public EvaluateRecipe(recipe:RatingAddModule):any{
        let url = `${environment.baseApiUrl}${this.controllerName}/EvaluateRecipe`;
        return super.add(recipe,url);
    }

    public GetRating(recipeId:string, isExternal:boolean):any{
        let url = `${environment.baseApiUrl}${this.controllerName}/GetRating?ratingDetails=${recipeId}@${isExternal}`;
        return super.getOne(url);
    }

    public WasEvaluated(recipeId:string,userId:string, isExternal:boolean):any{
        let url = `${environment.baseApiUrl}${this.controllerName}/WasEvaluated?ratingDetails=${recipeId}@@${userId}@@${isExternal}`;
        return super.getOne(url);
    }
}