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
import { LoginComponent } from './components/account/login/login.component';
import { RegisterComponent } from './components/account/register/register.component';
import { CreateRecipeComponent } from './components/recipe-components/create-recipe/create-recipe.component';
import { RecipeDetailsComponent } from './components/recipe-components/recipe-details/recipe-details.component';
import {MatIconModule} from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';
import { ToastrModule } from 'ngx-toastr';
import { AlertService } from './services/alert.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {FormsModule,ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { JwtModule } from '@auth0/angular-jwt';
import { AuthconfigInterceptor } from './shared/authconfig.interceptor';
import { UserProfileComponent } from './components/account/user-profile/user-profile.component';
import { ListCommentsComponent } from './components/comments/list-comments/list-comments.component';
import { CommentComponent } from './components/comments/comment/comment.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSelectModule} from '@angular/material/select';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import { ProfilePageComponent } from './components/account/profile-page/profile-page.component';
import { FavoriteComponent } from './components/recipe-components/favorite/favorite.component';
import { MenuComponent } from './components/account/menu/menu.component';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    RecipeCardComponent,
    RecipeListComponent,
    NavMenuComponent,
    LoginComponent,
    RegisterComponent,
    CreateRecipeComponent,
    RecipeDetailsComponent,
    UserProfileComponent,
    ListCommentsComponent,
    CommentComponent,
    ProfilePageComponent,
    FavoriteComponent,
    MenuComponent
  ],
  imports: [
    MatDividerModule,
    BrowserModule,
    MatFormFieldModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    FlexLayoutModule,
    MatSelectModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatIconModule,
    MatSnackBarModule,
    MatChipsModule,
    MatTooltipModule,
    MatAutocompleteModule,
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
