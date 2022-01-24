import { Injectable, Injector } from "@angular/core";
import { environment } from "src/environments/environment";
import { FavoriteInsertModule } from "../modules/favorite-insert.module";
import { BaseExternalApiService } from "./base-external-api.service";

@Injectable({
    providedIn:'root'
})
export class FavoriteService extends BaseExternalApiService{
    constructor(injector: Injector) {
        super(injector, 'Favorite');
    }

    public IsFavorite(recipeId:string, email:string, isExternal:boolean):any{
        let url = `${environment.baseApiUrl}${this.controllerName}/IsFavorite?favDetails=${recipeId}@@${isExternal}@@${email}`;
        return super.getOne(url);
    }
    public AddToFavorite(favorite:FavoriteInsertModule):any{
        let url = `${environment.baseApiUrl}${this.controllerName}/AddToFavorite`;
        return super.add(favorite,url);
    }

    public DeleteFavorite(favoriteId:string):any{
        let url = `${environment.baseApiUrl}${this.controllerName}/DeleteFavorite?favoriteId=${favoriteId}`;
        return super.delete(url);
    }

    public GetFavoriteRecipies(userId:string):any{
        let url = `${environment.baseApiUrl}${this.controllerName}/GetFavoriteRecipies?email=${userId}`;
        return super.getMany(url);
    }
}