import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommentGet } from 'src/app/modules/comment-get.module';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
  selector: 'app-list-comments',
  templateUrl: './list-comments.component.html',
  styleUrls: ['./list-comments.component.css']
})
export class ListCommentsComponent implements OnInit {
  comments: CommentGet[];
  @Input() recipeId: any;
  @Input() isExternal: boolean;
  form = new FormGroup({
    message: new FormControl('',[Validators.required])
  });
  constructor(private serviceComments: CommentsService) { }

  ngOnInit(): void {
    this.serviceComments.GetComments(this.recipeId, this.isExternal).subscribe(cr =>{
      this.comments=cr as CommentGet[];
    });
  }

  onSubmit():void{
    
  }
}
