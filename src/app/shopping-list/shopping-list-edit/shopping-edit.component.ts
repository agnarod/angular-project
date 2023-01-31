import { Component, ViewChild, ElementRef } from '@angular/core';
import { IngredientModel } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css']
})

export class ShoppingEditComponent {
    @ViewChild('nameInput', { static: true }) nameRef: ElementRef;
    @ViewChild('amountInput', { static: true }) amountRef: ElementRef;

    constructor(private shoppingListService: ShoppingListService) { }

    addIngredient() {
        const ingName: string = this.nameRef.nativeElement.value;
        const ingAmount: number = this.amountRef.nativeElement.value;
        const ingredient = new IngredientModel(ingName, ingAmount);
        this.shoppingListService.addIngredient(ingredient);

    }
}