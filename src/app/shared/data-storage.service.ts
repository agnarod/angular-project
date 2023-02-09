import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap } from "rxjs";
import { RecipeModel } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {

    constructor(private http: HttpClient, private recipeServ: RecipeService) { }

    storeRecipes() {
        const recipes = this.recipeServ.getRecipes();
        this.http.put(
            'https://ng-recipe-book-b1937-default-rtdb.firebaseio.com/recipes.json',
            recipes
        ).subscribe(response => {
            console.log(response);

        });
    }

    fetchRecipes() {
        
        return this.http.get<RecipeModel[]>(
            'https://ng-recipe-book-b1937-default-rtdb.firebaseio.com/recipes.json'
        )
        .pipe(map((recipes) => {
            return recipes.map(recipe=>{
                return {...recipe, ingredients : recipe.ingredients ? recipe.ingredients : []}
            })
        }),
        tap((recipes)=>{
            this.recipeServ.fetchRecipes(recipes);
        }));
    }

}