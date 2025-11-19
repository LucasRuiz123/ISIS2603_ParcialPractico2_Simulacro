import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../Recipe';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  standalone: false,
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css',
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe | null = null;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  ngOnInit() {
    // ✅ Obtener el id de la ruta (Punto 2)
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getRecipeDetail(+id);
    }
  }

  getRecipeDetail(id: number): void {
    // ✅ Consultar el servicio (Punto 2)
    this.recipeService.getRecipeDetail(id).subscribe({
      next: (recipe) => {
        this.recipe = recipe;
        console.log('Detalle de receta:', this.recipe);
      },
      error: (error) => {
        console.error('Error cargando detalle:', error);
      }
    });
  }

  // ✅ Punto 4: Método para encontrar el ingrediente más usado
  getMostUsedIngredient(): string {
    if (!this.recipe?.ingredientes || this.recipe.ingredientes.length === 0) {
      return 'No hay ingredientes';
    }

    let maxIngredient = this.recipe.ingredientes[0];
    for (const ingredient of this.recipe.ingredientes) {
      // Extraer número de la cantidad (ignorando unidades)
      const currentAmount = this.extractNumber(ingredient.cantidad);
      const maxAmount = this.extractNumber(maxIngredient.cantidad);
      
      if (currentAmount > maxAmount) {
        maxIngredient = ingredient;
      }
    }
    
    return maxIngredient.nombre;
  }

  private extractNumber(cantidad: string): number {
    // Extrae números de strings como "200 gramos", "1 taza", etc.
    const match = cantidad.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  }
}