import { Component, EventEmitter, Output } from '@angular/core';
import { RecipeModel } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {

  recipes: RecipeModel[] = [
    new RecipeModel("A test recipe", "this is simply a test", "https://freesvg.org/img/RecipeBook.png"),
    new RecipeModel("A test recipe2", "this is simply a test2", "https://freesvg.org/img/RecipeBook.png"),
    new RecipeModel("A test recipe3", "this is simply a test3", "https://freesvg.org/img/RecipeBook.png"),
    new RecipeModel("A test recipe4", "this is simply a test4", "https://freesvg.org/img/RecipeBook.png")
  ];

  @Output() onRecipeSelected = new EventEmitter<RecipeModel>();

  constructor(){}

  ngOnInit(){

  }

  onSelected(selectedRecipe:RecipeModel){
    this.onRecipeSelected.emit(selectedRecipe);
  }

}
