import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { RecipeModule } from 'src/app/modules/recipe.module';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls:['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
list = new RecipeModule();

constructor(private serviceRecipe: RecipeService) {
    this.serviceRecipe.GetRecipes().subscribe(cr => {
   this.list = cr as RecipeModule;
   });
}
 

ngOnInit(): void {

}

}
