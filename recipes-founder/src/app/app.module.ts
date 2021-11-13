import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuBarComponent } from './components/single-components/menu-bar/menu-bar.component';
import { AlertService } from './services/alert.service';
import { AppErrorHandler } from './handler-error/app-error-handler';
import { HomePageComponent } from './components/home-page/home-page.component';
import { RecipeCardComponent } from './components/recipes/recipe-card/recipe-card.component';
import { RecipeListComponent } from './components/recipes/recipe-list/recipe-list.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuBarComponent,
    HomePageComponent,
    RecipeCardComponent,
    RecipeListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot(),
  ],
  providers: [    
    AlertService,
    AppErrorHandler,],
  bootstrap: [AppComponent]
})
export class AppModule { }
