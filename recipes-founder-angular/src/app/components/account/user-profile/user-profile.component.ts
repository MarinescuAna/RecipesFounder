import { RecipeOverviewInfoModule } from './../../../modules/recipe-overview-info.module';
import { RecipeGetModule } from './../../../modules/recipe-get.module';
import { AuthService } from './../../../shared/auth.service';
import { RecipeService } from './../../../services/recipe.service';
import { RecipeModule } from './../../../modules/recipe.module';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  list = new RecipeModule();
  constructor(private serviceRecipe: RecipeService,private authService:AuthService) { }

  ngOnInit(): void {
    this.serviceRecipe.GetUserRecipies(this.authService.decodeJWToken('email')).subscribe(cr => {
      let list2 = cr as RecipeGetModule[];
      this.list.results=[];
      list2.forEach(element =>{
        let newRecipe = new RecipeOverviewInfoModule;
        newRecipe.id=element.id;
        newRecipe.image=element.image;
        newRecipe.title=element.title;
        newRecipe.isPublic=element.isPublic;
        this.list.results.push(newRecipe);
      });
    },
      err => {
        this.serviceRecipe.alertService.showError(err.message);
      });;
  }


}
