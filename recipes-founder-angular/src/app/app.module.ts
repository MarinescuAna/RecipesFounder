import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecipeCardComponent } from './components/recipe-components/recipe-card/recipe-card.component';
import { RecipeListComponent } from './components/recipe-components/recipe-list/recipe-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule} from '@angular/material/dialog';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { MainShoppingListComponent } from './components/shopping-list/main-shopping-list/main-shopping-list.component';
import { LoginComponent } from './components/account/login/login.component';
import { RegisterComponent } from './components/account/register/register.component';
import { MyRecipeComponent } from './components/recipe-components/my-recipe/my-recipe.component';
import { CreateRecipeComponent } from './components/recipe-components/create-recipe/create-recipe.component';
import { RecipeDetailsComponent } from './components/recipe-components/recipe-details/recipe-details.component';
import {MatIconModule} from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';
@NgModule({
  declarations: [
    AppComponent,
    RecipeCardComponent,
    RecipeListComponent,
    NavMenuComponent,
    MainShoppingListComponent,
    LoginComponent,
    RegisterComponent,
    MyRecipeComponent,
    CreateRecipeComponent,
    RecipeDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatChipsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
