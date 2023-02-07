import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  constructor(private route: ActivatedRoute, private recipeService:RecipeService, private router:Router) { }
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
      }
    );
    this.initForm();

    console.log(this.recipeForm);
    
  }

  private initForm(){
    let recipeName = '';
    let imagePath ='';
    let description = ''
    let recipeIngredientes =  new FormArray([]);
    if(this.editMode){
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      imagePath= recipe.imagePath;
      description = recipe.description;
      for(let ingrediente of recipe.ingredients){
        recipeIngredientes.push(
          new FormGroup({
            'name': new FormControl(ingrediente.name, Validators.required),
            'amount': new FormControl(ingrediente.amount,[
              Validators.required, 
                Validators.pattern(/^[1-9]+[0-9]*$/)
            ])
          })
        )
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(imagePath, Validators.required),
      'description': new FormControl(description,Validators.required),
      'ingredients': recipeIngredientes
    });
  }

  onSubmit(){
    const recipe =  this.recipeForm.value;
    if(this.editMode){
      this.recipeService.updateRecipe(this.id, recipe);
    }
    else{
      this.recipeService.addRecipe(recipe);
    }
    this.onCancel();
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo:this.route});
  }

  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null,[
          Validators.required, 
            Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    )
  }

  onDeleteIngredient(index:number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }


}
