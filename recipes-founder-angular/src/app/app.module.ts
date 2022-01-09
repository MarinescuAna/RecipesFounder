import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { ToastrModule } from 'ngx-toastr';
import { AlertService } from './services/alert.service';
import { RecipeEvaluationComponent } from './components/recipe-evaluation/recipe-evaluation.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {FormsModule,ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { JwtModule } from '@auth0/angular-jwt';
import { AuthconfigInterceptor } from './shared/authconfig.interceptor';
import { UserProfileComponent } from './components/account/user-profile/user-profile.component';
import { ListCommentsComponent } from './components/recipe-evaluation/comments/list-comments/list-comments.component';
import { CommentComponent } from './components/recipe-evaluation/comments/comment/comment.component';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

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
    RecipeDetailsComponent,
    RecipeEvaluationComponent,
    UserProfileComponent,
    ListCommentsComponent,
    CommentComponent
  ],
  imports: [
    BrowserModule,
    MatFormFieldModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatSnackBarModule,
    MatChipsModule,
    MatTooltipModule,
    ToastrModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    }),
  ],
  providers: [
    AlertService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthconfigInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
