import { Component} from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
    selector:'app-header',
    templateUrl:'./header.component.html',
    styleUrls:['./header.component.css']
})

export class HeaderComponent{

    constructor(private dataService: DataStorageService){}

    onSave(){
        this.dataService.storeRecipes();
    }

    onFetch(){
        this.dataService.fetchRecipes().subscribe();
    }
}