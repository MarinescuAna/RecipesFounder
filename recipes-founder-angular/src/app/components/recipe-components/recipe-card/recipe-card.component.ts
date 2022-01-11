import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { RecipeOverviewInfoModule } from 'src/app/modules/recipe-overview-info.module';
import { ParamModule } from './param.module';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css']
})
export class RecipeCardComponent implements OnInit {

  @Input() recipe: RecipeOverviewInfoModule;
  @Input() isExternal:boolean;
  constructor( private route:Router
      ) {

   }

  ngOnInit(): void {

  }

  onRouteTo():void{
    let paramTemp= ParamModule;
    paramTemp.id=this.recipe.id;
    paramTemp.isExternal=this.isExternal;
    let navigationExtras: NavigationExtras = {
      queryParams: paramTemp
    };
    this.route.navigate(['\details'], navigationExtras);
  }
}
