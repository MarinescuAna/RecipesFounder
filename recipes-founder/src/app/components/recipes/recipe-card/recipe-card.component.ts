import { Component, Input, OnInit } from '@angular/core';
import {RecipeModule} from 'src/app/modules/recipe.module';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css']
})
export class RecipeCardComponent implements OnInit {

  @Input() recipe: RecipeModule;
  
  constructor() { }

  ngOnInit(): void {
  }

}
