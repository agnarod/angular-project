import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";

import { RecipeDetailsComponent } from "./recipe-details/recipe-details.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipesRoutingModule } from "./recipes-routing.module";
import { RecipesComponent } from "./recipes.component";
import { SelectRecipeComponent } from "./select-recipe/select-recipe.component";

@NgModule({
    declarations: [
        RecipesComponent,
        RecipeListComponent,
        RecipeDetailsComponent,
        RecipeItemComponent,
        SelectRecipeComponent,
        RecipeEditComponent
    ],
    imports:[RouterModule, SharedModule, ReactiveFormsModule, RecipesRoutingModule]
})
export class RecipesModule {

}