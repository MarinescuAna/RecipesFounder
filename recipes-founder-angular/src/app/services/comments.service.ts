import { Injectable, Injector } from "@angular/core";
import { environment } from "src/environments/environment";
import { CommentInsert } from "../modules/comment-insert.module";
import { BaseExternalApiService } from "./base-external-api.service";

@Injectable({
    providedIn: 'root'
})
export class CommentsService extends BaseExternalApiService {
    constructor(injector: Injector) {
        super(injector, 'Comment');
    }

    InsertComment(comment: CommentInsert): any {
       let url = `${environment.baseApiUrl}${this.controllerName}/InsertComment`;
       return super.add(comment,url);
    }

    GetComments(recipeId:string, isExternal:boolean): any{
        let url = `${environment.baseApiUrl}${this.controllerName}/GetComments?recipeDetails=${recipeId}@${isExternal}`;
        return super.getMany(url);
    }
}