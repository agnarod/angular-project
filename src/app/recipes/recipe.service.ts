import { EventEmitter, Injectable } from '@angular/core';
import { IngredientModel } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { RecipeModel } from './recipe.model';

@Injectable()
export class RecipeService {
    private recipes: RecipeModel[] = [
        new RecipeModel(
            "Tasty Schnitzel",
            "A super-tasty Schnitzel - Just awesome!",
            "https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG",
            [
                new IngredientModel('meat',1),
                new IngredientModel('french fries', 20)
            ]
        ),
        new RecipeModel(
            "Big Fat Burger",
            "What else you need to say?",
            "https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg",
            [
                new IngredientModel('buns', 2),
                new IngredientModel('meat', 1)
            ]
        )
    ];

    constructor(private shoppingListService:ShoppingListService){}

    recipeSelected = new EventEmitter<RecipeModel>();

    public getRecipes(): RecipeModel[] {
        return this.recipes.slice();
    }

    public getRecipe(id:number):RecipeModel{
        return this.recipes[id];
    }
    
    ingredientsToShoppingList(ingredients:IngredientModel[]){
        this.shoppingListService.addIngredients(ingredients);
    }


}