import { EventEmitter } from "@angular/core";
import { IngredientModel } from "../shared/ingredient.model";

export class ShoppingListService{
    ingredientsChanged = new EventEmitter<IngredientModel[]>();

    private ingredients:IngredientModel[] = [
        new IngredientModel("tomatoes", 5),
        new IngredientModel("potatoes", 3),
        new IngredientModel("chillies", 2)
    ];

    getIngredients(){
        return this.ingredients.slice();
    }

    addIngredient(ingredient: IngredientModel){
        this.ingredients.push(ingredient);
        this.ingredientsChanged.emit(this.ingredients.slice());
    }

    addIngredients(ingredients: IngredientModel[]){
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.emit(this.ingredients.slice());
    }
}