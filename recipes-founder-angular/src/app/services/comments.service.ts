import { Injectable, Injector } from "@angular/core";
import { CommentInsert } from "../modules/comment-insert.module";
import { BaseService } from "./base.service";

@Injectable({
    providedIn: 'root'
})
export class CommentsService extends BaseService {
    constructor(injector: Injector) {
        super(injector, 'Comment');
    }

    InsertComment(comment: CommentInsert): void {
        super
            .post('InsertComment', comment)
            .subscribe(comm => {
                this.alertService.showSucces("Success!");
            },
                err => {
                    console.log(err);
                    this.alertService.showError(err.message);
                });
    }

    GetComments(recipeId:number, isExternal:boolean): any{
        return super.getMany(`InsertComment/${recipeId}#${isExternal}`);
    }
}