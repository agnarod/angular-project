import { Component, ViewChild,ElementRef, Output, EventEmitter } from '@angular/core';
import { IngredientModel } from 'src/app/shared/ingredient.model';

@Component({
    selector:'app-shopping-edit',
    templateUrl:'./shopping-edit.component.html',
    styleUrls:['./shopping-edit.component.css']
})

export class ShoppingEditComponent{
    @ViewChild('nameInput', {static:true}) nameRef: ElementRef; 
    @ViewChild('amountInput', {static:true}) amountRef: ElementRef; 
    @Output() OnIngredientAdded = new EventEmitter<IngredientModel>();

    addIngredient(){
        this.OnIngredientAdded.emit(
            new IngredientModel(
                this.nameRef.nativeElement.value,
                this.amountRef.nativeElement.value
                ))
    }
}