import { Component, Input } from '@angular/core';
import { RecipeModel } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent {
  @Input() recipeDetails:RecipeModel;

  constructor(private recipeService:RecipeService){}

  onAddToShoppingList(){
    this.recipeService
    .ingredientsToShoppingList(this.recipeDetails.ingredients);
  }
}
