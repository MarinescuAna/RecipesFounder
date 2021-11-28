import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { RecipeOverviewInfoModule } from 'src/app/modules/recipe-overview-info.module';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css']
})
export class RecipeCardComponent implements OnInit {

  @Input() recipe: RecipeOverviewInfoModule;
  constructor( private route:Router
      ) {

   }

  ngOnInit(): void {

  }

  onRouteTo():void{
    let navigationExtras: NavigationExtras = {
      queryParams:{ 
        id : this.recipe.id 
      }
    };
    this.route.navigate(['\details'], navigationExtras);
  }
}
