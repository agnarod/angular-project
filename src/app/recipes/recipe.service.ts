import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IngredientModel } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { RecipeModel } from './recipe.model';

@Injectable()
export class RecipeService {
    
    recipesChanged = new Subject<RecipeModel[]>();

    private recipes: RecipeModel[] = [];
    constructor(private shoppingListService:ShoppingListService){}


    public getRecipes(): RecipeModel[] {        
        return this.recipes.slice();
    }

    public getRecipe(id:number):RecipeModel{
        return this.recipes[id];
    }
    
    ingredientsToShoppingList(ingredients:IngredientModel[]){
        this.shoppingListService.addIngredients(ingredients);
    }

    addRecipe(recipe: RecipeModel){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index:number, newRecipe: RecipeModel){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index:number){
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice());
    }

    fetchRecipes(recipes: RecipeModel[]){
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }


}