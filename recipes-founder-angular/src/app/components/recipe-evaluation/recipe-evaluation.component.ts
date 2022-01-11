import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipe-evaluation',
  templateUrl: './recipe-evaluation.component.html',
  styleUrls: ['./recipe-evaluation.component.css']
})
export class RecipeEvaluationComponent implements OnInit {


  @Input() recipeId:any;
  @Input() isExternal: boolean;

  icones = ['mood_bad',
    'sentiment_very_dissatisfied',
    'sentiment_satisfied',
    'sentiment_satisfied_alt',
    'insert_emoticon'];

  colors = ['#F44336',
    '#FF5252',
    '#FFC107',
    '#8BC34A',
    '#4CAF50'];
  snackBarDuration = 2000;
  ratingArr:number[] = [];

  constructor() {
  }


  ngOnInit(): void {

  }
  onClick(rating: number): boolean {
  //  this.ratingUpdated.emit(rating);
    return false;
  }

  showIcon(index: number): any {
    
  }

  submitFeedback(): void {

  }
}
