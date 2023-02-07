import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecipeModel } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes: RecipeModel[];
  recipeSub: Subscription;

  constructor(private recipeService: RecipeService,
    private router:Router, private route:ActivatedRoute) { }


  ngOnDestroy(): void {
    this.recipeSub.unsubscribe();
  }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this.recipeSub = this.recipeService.recipesChanged.subscribe(
      (recipes: RecipeModel[])=>{
        this.recipes = recipes;
      }
    );
  }

  onNewRecipe(){
    this.router.navigate(['new'],{relativeTo:this.route})
  }

}
