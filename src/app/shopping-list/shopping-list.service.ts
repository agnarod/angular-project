import { Subject } from "rxjs";
import { IngredientModel } from "../shared/ingredient.model";

export class ShoppingListService{
    ingredientsChanged = new Subject<IngredientModel[]>();
    startingEditing = new Subject<number>();

    private ingredients:IngredientModel[] = [
        new IngredientModel("tomatoes", 5),
        new IngredientModel("potatoes", 3),
        new IngredientModel("chillies", 2)
    ];

    getIngredients(){
        return this.ingredients.slice();
    }

    getIngredient(index:number){
        return this.ingredients[index];
    }

    addIngredient(ingredient: IngredientModel){
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addIngredients(ingredients: IngredientModel[]){
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    updateIngredient(index:number, newIngredient: IngredientModel){
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }
    deleteIngredient(index: number){
        this.ingredients.splice(index,1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}