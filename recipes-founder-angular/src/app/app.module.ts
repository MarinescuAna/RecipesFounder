import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { RecipeCardComponent } from './components/recipe-components/recipe-card/recipe-card.component';
import { RecipeListComponent } from './components/recipe-components/recipe-list/recipe-list.component';
import { MatCardModule } from '@angular/material/card';
import { RecipeMainComponent } from './components/recipe-details/recipe-main/recipe-main.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    RecipeCardComponent,
    RecipeListComponent,
    RecipeMainComponent
  ],
  imports: [
    MatCardModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
