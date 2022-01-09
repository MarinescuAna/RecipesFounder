import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipe-evaluation',
  templateUrl: './recipe-evaluation.component.html',
  styleUrls: ['./recipe-evaluation.component.css']
})
export class RecipeEvaluationComponent implements OnInit {


  @Input() recipeId;
  descriptionForm = new FormControl('', Validators.required);
  @Input() rating = 0;
  @Input() starCount = 5;
  //@Output() ratingUpdated = new EventEmitter();

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
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
  }
  onClick(rating: number): boolean {
  //  this.ratingUpdated.emit(rating);
    return false;
  }

  showIcon(index: number): string {
    if (this.rating >= index + 1) {
      return 'close';
    } else {
      return this.icones[index];
    }
  }

  submitFeedback(): void {

  }
}
