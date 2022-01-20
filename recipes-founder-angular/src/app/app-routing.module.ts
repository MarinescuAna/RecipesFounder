import { MyRecipeComponent } from './components/recipe-components/my-recipe/my-recipe.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/account/login/login.component';
import { RegisterComponent } from './components/account/register/register.component';
import { RecipeListComponent } from './components/recipe-components/recipe-list/recipe-list.component';
import { RecipeDetailsComponent } from './components/recipe-components/recipe-details/recipe-details.component';
import { MainShoppingListComponent } from './components/shopping-list/main-shopping-list/main-shopping-list.component';
import { UserProfileComponent } from './components/account/user-profile/user-profile.component';
import { AuthGuard } from './shared/auth.guard';
import { CreateRecipeComponent } from './components/recipe-components/create-recipe/create-recipe.component';

const routes: Routes = [
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
    path:'shopping-list',
    component: MainShoppingListComponent,
    canActivate: [AuthGuard]
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
