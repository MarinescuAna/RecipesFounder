import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeListComponent } from './components/recipe-components/recipe-list/recipe-list.component';
import { RecipeMainComponent } from './components/recipe-details/recipe-main/recipe-main.component';

const routes: Routes = [
  {
    path: 'landing-page',
    component: RecipeListComponent
  },
  {
    path: '',
    redirectTo: '/landing-page',
    pathMatch: 'full'
  },
  {
    path : 'details/:id', 
    component : RecipeMainComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
