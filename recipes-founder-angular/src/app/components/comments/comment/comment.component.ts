import { Component, Input, OnInit } from '@angular/core';
import { CommentGet } from 'src/app/modules/comment-get.module';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() comment: CommentGet;

  constructor() { }

  ngOnInit(): void {
  }

}
