import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from './Recipe';


@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private apiUrl = environment.apiUrl;
  //private apiDetailUrl = environment.apiDetailUrl;

  constructor(private http: HttpClient) { }

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.apiUrl+"/recipe.json");
  }

  getRecipeDetail(id: number): Observable<Recipe> {
  return this.http.get<Recipe>(`${this.apiUrl}/${id}/recipe.json`);
  }
}
