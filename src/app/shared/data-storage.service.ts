import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, tap, throwError } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { RecipeModel } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {

    constructor(private http: HttpClient, 
        private recipeServ: RecipeService, 
        private authServ: AuthService) { }

    storeRecipes() {
        const recipes = this.recipeServ.getRecipes();
        return this.http.put<RecipeModel[]>(
            'http://localhost:8080/recipebook/recipes',
            JSON.stringify(recipes)
        ).
        pipe(
            catchError(err=>{
                return throwError(err);;
            }),
            tap(resData=>{
                
            })
        );
    }

    fetchRecipes() {
       
        return this.http.get<RecipeModel[]>(
            'http://localhost:8080/recipebook/recipes'
        ).pipe(map((recipes) => {
            
            return recipes.map(recipe=>{
                return {...recipe, ingredients : recipe.ingredients ? recipe.ingredients : []}
            })
        }),
        tap((recipes)=>{
            this.recipeServ.fetchRecipes(recipes);
        })
        );
    }
    

}