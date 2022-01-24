import { RecipeService } from 'src/app/services/recipe.service';
import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { RecipeOverviewInfoModule } from 'src/app/modules/recipe-overview-info.module';
import { AuthService } from 'src/app/shared/auth.service';
import { RatingService } from 'src/app/services/rating.service';
import { RatingAddModule } from 'src/app/modules/rating-add.module';
import { FavoriteService } from 'src/app/services/favorite.service';
import { FavoriteInsertModule } from 'src/app/modules/favorite-insert.module';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css']
})
export class RecipeCardComponent implements OnInit {

  publishText:string;
  @Input() disabledFavorite:boolean = false;
  @Input() deleteFavorite:boolean;
  @Input() canBeModify:boolean;
  @Input() recipe: RecipeOverviewInfoModule;
  wasNoEvaluated=false;
  isLogged=false;
  isFavorite=false;
  constructor( 
                private route:Router, 
                private service:RecipeService, 
                private authService:AuthService, 
                private ratingService:RatingService,
                private favoriteService:FavoriteService
      ) {

   }

  ngOnInit(): void {
    this.publishText =  this.recipe.isPublic? 'Not publish':'Publish';
    this.favoriteService.IsFavorite(this.recipe.id,this.authService.decodeJWToken('email'),this.recipe.isExternal).subscribe(cr =>{
      this.isFavorite=cr as boolean;
    });
    this.isLogged=this.authService.isLogged();
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
        this.wasNoEvaluated=true;
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
  onFavorite():void{
    let fav=new FavoriteInsertModule;
    fav.email=this.authService.decodeJWToken('email');
    fav.isExternal=this.recipe.isExternal;
    fav.recipeId=this.recipe.id;
    this.favoriteService.AddToFavorite(fav).subscribe(cr=>{
      this.service.alertService.showSucces("Success!");
      this.isFavorite=true;
    },err=>{
      this.service.alertService.showError(err.message);
    });
  }

  onNotFavorite():void{
    this.favoriteService.DeleteFavorite(this.recipe.idFavorite).subscribe(
      cr=>{
        this.service.alertService.showSucces("Success!");
        window.location.reload();
      },err=>{
        this.service.alertService.showError(err.message);
      });
    }
}
