import { Component } from "@angular/core";
import { IngredientModel } from "../shared/ingredient.model";

@Component({
    selector:   'app-shopping-list',
    templateUrl:'./shopping-list.component.html',
    styleUrls:['./shopping-list.component.css']
})

export class ShoppingListComponent{

    ingredients:IngredientModel[] = [
        new IngredientModel("tomatoes", 5),
        new IngredientModel("potatoes", 3),
        new IngredientModel("chillies", 2)
    ];

    constructor(){

    }
    ngOnInit(){

    }
    newIngredientAdded(ingredient:IngredientModel){
        this.ingredients.push(ingredient);
    }

}