import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { RecipeCardModule } from 'src/app/modules/recipe-card.module';
import { RecipeOverviewInfoModule } from 'src/app/modules/recipe-overview-info.module';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css']
})
export class RecipeCardComponent implements OnInit {

  @Input() recipe: RecipeOverviewInfoModule;
  constructor( private route: Router) {

   }

  ngOnInit(): void {

  }

  GoTo():void{
    this.route.navigate(['details',this.recipe.id]);
  }
}
