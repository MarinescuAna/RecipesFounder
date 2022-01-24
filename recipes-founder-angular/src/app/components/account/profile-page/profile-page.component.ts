import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeGetModule } from 'src/app/modules/recipe-get.module';
import { RecipeOverviewInfoModule } from 'src/app/modules/recipe-overview-info.module';
import { UserGetModule } from 'src/app/modules/user-get.module';
import { RecipeService } from 'src/app/services/recipe.service';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  list:RecipeOverviewInfoModule[]=[];
  user:UserGetModule;
  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private authService:AuthService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        this.authService.GetUserInformation(params["email"]).subscribe(cr =>{
          this.user=cr as UserGetModule;
        });
        this.recipeService.GetUserPublicRecipies(params["email"]).subscribe(cr => {
          let list2 = cr as RecipeGetModule[];
          list2.forEach(element =>{
            let newRecipe = new RecipeOverviewInfoModule;
            newRecipe.id=element.id;
            newRecipe.image=element.image;
            newRecipe.title=element.title;
            newRecipe.isPublic=element.isPublic;
            this.list.push(newRecipe);
          });
        },
          err => {
            this.recipeService.alertService.showError(err.message);
          });;
      }
    );
  }

}
