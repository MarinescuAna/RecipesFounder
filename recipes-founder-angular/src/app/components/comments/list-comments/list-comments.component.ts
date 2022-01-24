import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommentGet } from 'src/app/modules/comment-get.module';
import { CommentInsert } from 'src/app/modules/comment-insert.module';
import { RecipeOverviewInfoModule } from 'src/app/modules/recipe-overview-info.module';
import { CommentsService } from 'src/app/services/comments.service';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-list-comments',
  templateUrl: './list-comments.component.html',
  styleUrls: ['./list-comments.component.css']
})
export class ListCommentsComponent implements OnInit {
  comments: CommentGet[]=[];
  isLogged=false;
  @Input() recipe: RecipeOverviewInfoModule;
  form = new FormGroup({
    message: new FormControl('',[Validators.required])
  });
  constructor(private serviceComments: CommentsService, private serviceAuth: AuthService) { }

  ngOnInit(): void {
    this.isLogged=this.serviceAuth.isLogged();
    this.serviceComments.GetComments(this.recipe.id, this.recipe.isExternal).subscribe(cr =>{
      this.comments=cr as CommentGet[];
    });
  }

  onSubmit():void{

    let comment = new CommentInsert();
    comment.content=this.form.value.message;
    comment.recipeID=this.recipe.id;
    comment.isExternal=this.recipe.isExternal;
    comment.user=this.serviceAuth.decodeJWToken('email');
    this.serviceComments.InsertComment(comment).subscribe(cr =>{
      let get = new CommentGet();
      get.content=comment.content;
      get.datetimeAdded="a few seconds ago";
      get.userName=this.serviceAuth.decodeJWToken('unique_name')
      this.comments.push(get);
      this.form.value.message= new FormControl('',[Validators.required]);
    },
    err =>{
      this.serviceComments.alertService.showError(err.message);
    });

  }
}
