import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { DataStorageService } from "../shared/data-storage.service";
import { RecipeModel } from "./recipe.model";
import { RecipeService } from "./recipe.service";

@Injectable({
    providedIn: 'root'
})
export class RecipeResolverService implements Resolve<RecipeModel[]>{

    constructor(private dataStorage: DataStorageService, private recipesServ: RecipeService) { }

    resolve(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): RecipeModel[] |
        Observable<RecipeModel[]> |
        Promise<RecipeModel[]> {
        const recipes = this.recipesServ.getRecipes();
        if (recipes.length == 0) {
            return this.dataStorage.fetchRecipes();
        }
        return recipes;
    }

}