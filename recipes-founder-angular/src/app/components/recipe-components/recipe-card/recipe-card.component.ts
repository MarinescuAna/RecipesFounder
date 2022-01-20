import { RecipeService } from 'src/app/services/recipe.service';
import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { RecipeOverviewInfoModule } from 'src/app/modules/recipe-overview-info.module';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css']
})
export class RecipeCardComponent implements OnInit {

  @Input() canBeModify:boolean;
  @Input() recipe: RecipeOverviewInfoModule;
  constructor( private route:Router, private service:RecipeService
      ) {

   }

  ngOnInit(): void {

  }

  onPulish():void{
    this.service.MakePublic(this.recipe.id).subscribe(cr =>{
        this.service.alertService.showSucces("Success!");
    },err=>{
      this.service.alertService.showError(err.message);
    });
  }
  onRouteTo():void{
    let navigationExtras: NavigationExtras = {
      queryParams: this.recipe
    };
    this.route.navigate(['\details'], navigationExtras);
  }
}
