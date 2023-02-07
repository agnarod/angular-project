import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IngredientModel } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css']
})

export class ShoppingEditComponent implements OnInit, OnDestroy {

    @ViewChild('f', {static:true}) shooppingForm: NgForm;
    shoppingListSub: Subscription;
    edditMode = false;
    editedItemIndex:number;
    editedItem: IngredientModel;

    constructor(private shoppingListService: ShoppingListService) { }

    ngOnDestroy(): void {
        this.shoppingListSub.unsubscribe();
    }

    ngOnInit(): void {
        this.shoppingListSub = this.shoppingListService.startingEditing.subscribe(
            (index)=>{
                this.edditMode = true;
                this.editedItemIndex = index;
                this.editedItem = this.shoppingListService.getIngredient(index)
                this.shooppingForm.setValue({
                    name: this.editedItem.name,
                    amount: this.editedItem.amount
                })
            }
        );
    }
 
    onSave() {
        const value = this.shooppingForm.value;
        if(this.edditMode){
            this.editedItem.name = value.name;
            this.editedItem.amount = value.amount;

            this.shoppingListService.updateIngredient(this.editedItemIndex, this.editedItem);

        }
        else{
            const ingredient = new IngredientModel(value.name, value.amount);
            this.shoppingListService.addIngredient(ingredient);
        }
        this.onClear();
    }

    onClear(){
        
        this.edditMode = false;
        this.shooppingForm.reset();
    }

    onDelete(){
        this.shoppingListService.deleteIngredient(this.editedItemIndex);
        this.onClear();
    }
}