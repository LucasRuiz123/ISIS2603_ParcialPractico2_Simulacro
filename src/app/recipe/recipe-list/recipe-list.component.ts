import { Component, OnInit } from '@angular/core';
import { Recipe } from '../Recipe';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  standalone: false,
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService) {}

  getRecipes(): void {
    this.recipeService.getRecipes().subscribe({
      next: (recipes) => {
        this.recipes = recipes;
        console.log('Recetas cargadas:', this.recipes);
      },
      error: (error) => {
        console.error('Error cargando recetas:', error);
      }
    });
  }

  ngOnInit() {
    this.getRecipes();
  }

  // ✅ Punto 4: Método para contar ingredientes
  countIngredients(recipe: Recipe): number {
    return recipe.ingredientes ? recipe.ingredientes.length : 0;
  }
}