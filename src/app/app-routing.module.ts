import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeListComponent } from './recipe/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe/recipe-detail/recipe-detail.component';

const routes: Routes = [
  {
    path: '',                    // Ruta raíz
    redirectTo: '/recipe',       // ✅ CORRECTO - redirige a la ruta /recipe
    pathMatch: 'full'
  },
  {
    path: 'recipe',              // Lista de recetas
    component: RecipeListComponent
  },
  {
    path: 'recipe/:id',          // Detalle de receta
    component: RecipeDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
