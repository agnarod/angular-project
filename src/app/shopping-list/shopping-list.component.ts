import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IngredientModel } from "../shared/ingredient.model";
import { ShoppingListService } from "./shopping-list.service";

@Component({
    selector:   'app-shopping-list',
    templateUrl:'./shopping-list.component.html',
    styleUrls:['./shopping-list.component.css']
})

export class ShoppingListComponent implements OnInit, OnDestroy{

    ingredients:IngredientModel[];
    private shoppingSubscription:Subscription;

    constructor(private shoppingListService: ShoppingListService){

    }

    ngOnDestroy(): void {
        this.shoppingSubscription.unsubscribe();
    }

    ngOnInit(){
        this.ingredients = this.shoppingListService.getIngredients();
        this.shoppingSubscription = this.shoppingListService.ingredientsChanged.subscribe(
            (currentIngredients: IngredientModel[])=>{
                this.ingredients = currentIngredients;
            }
        )
    }

    onEditItem(item:number){
        this.shoppingListService.startingEditing.next(item);
    }
    
}