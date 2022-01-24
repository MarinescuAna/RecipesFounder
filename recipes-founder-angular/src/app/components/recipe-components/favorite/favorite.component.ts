import { Component, OnInit } from '@angular/core';
import { FavoriteGetModule } from 'src/app/modules/favorite-get.module';
import { RecipeDetailsModule } from 'src/app/modules/recipe-details.module';
import { RecipeOverviewInfoModule } from 'src/app/modules/recipe-overview-info.module';
import { RecipeModule } from 'src/app/modules/recipe.module';
import { FavoriteService } from 'src/app/services/favorite.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {

  list = new RecipeModule();
  constructor(private favoriteService:FavoriteService, private authService:AuthService,private recipeService:RecipeService) { }

  ngOnInit(): void {
    this.favoriteService.GetFavoriteRecipies(this.authService.decodeJWToken('email')).subscribe(cr => {
      let list2 = cr as FavoriteGetModule[];
      this.list.results=[];
      list2.forEach(element =>{
        let newRecipe = new RecipeOverviewInfoModule;
        if(element.externalRecipe==null)
        {
          newRecipe.id=element.recipeId;
          newRecipe.image=element.image;
          newRecipe.title=element.title;
          newRecipe.isPublic=true;
          newRecipe.isExternal=false;
          newRecipe.idFavorite=element.id;
        }else{
          this.recipeService.GetRecipeInformation(element.externalRecipe).subscribe(cr => {
            let recipe= cr as RecipeDetailsModule;
            newRecipe.id=element.externalRecipe;
            newRecipe.isPublic=true;
            newRecipe.isExternal=true;
            newRecipe.title=recipe.title;
            newRecipe.image=recipe.image;
            newRecipe.idFavorite=element.id;
          });
        }

        this.list.results.push(newRecipe);
      });
    },
      err => {
        this.favoriteService.alertService.showError(err.message);
      });;
  }


}
