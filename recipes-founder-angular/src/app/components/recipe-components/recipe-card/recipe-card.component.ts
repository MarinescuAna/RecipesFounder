import { RecipeService } from 'src/app/services/recipe.service';
import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { RecipeOverviewInfoModule } from 'src/app/modules/recipe-overview-info.module';
import { AuthService } from 'src/app/shared/auth.service';
import { RatingService } from 'src/app/services/rating.service';
import { RatingAddModule } from 'src/app/modules/rating-add.module';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css']
})
export class RecipeCardComponent implements OnInit {

  @Input() canBeModify:boolean;
  @Input() recipe: RecipeOverviewInfoModule;
  wasNoEvaluated=false;
  isLogged=false;
  constructor( private route:Router, private service:RecipeService, private authService:AuthService, private ratingService:RatingService
      ) {

   }

  ngOnInit(): void {
    this.isLogged=this.authService.isLogged();
    debugger
    if(this.isLogged){
      this.ratingService.WasEvaluated(this.recipe.id,this.authService.decodeJWToken('email'),this.recipe.isExternal).subscribe(
        cr => {
          this.wasNoEvaluated=cr as boolean;
        }
      );
    }
  }
  onEvaluate(tag:string):void{
    let evaluate=new RatingAddModule();
    evaluate.userId=this.authService.decodeJWToken('email');
    evaluate.isExternal=this.recipe.isExternal;
    evaluate.recipeId=this.recipe.id;
    evaluate.value=tag;
    this.ratingService.EvaluateRecipe(evaluate).subscribe(
      cr =>{
        this.ratingService.alertService.showSucces("Success!");
        this.wasNoEvaluated=false;
      },
      err=>{
        this.ratingService.alertService.showError(err.message);
      }
    )
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
