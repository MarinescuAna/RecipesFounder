import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/account/login/login.component';
import { RegisterComponent } from './components/account/register/register.component';
import { RecipeListComponent } from './components/recipe-components/recipe-list/recipe-list.component';
import { RecipeDetailsComponent } from './components/recipe-components/recipe-details/recipe-details.component';
import { UserProfileComponent } from './components/account/user-profile/user-profile.component';
import { AuthGuard } from './shared/auth.guard';
import { CreateRecipeComponent } from './components/recipe-components/create-recipe/create-recipe.component';
import { FavoriteComponent } from './components/recipe-components/favorite/favorite.component';
import { ProfilePageComponent } from './components/account/profile-page/profile-page.component';

const routes: Routes = [
  {
    path: 'users',
    component: ProfilePageComponent
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    component: RecipeListComponent
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'register',
    component: RegisterComponent
  },
  {
    path:'create',
    component: CreateRecipeComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'details',
    component: RecipeDetailsComponent
  },
  {
    path:'favorite',
    component: FavoriteComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: '\home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
