import { Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { UserModel } from '../auth/user.model';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
    selector:'app-header',
    templateUrl:'./header.component.html',
    styleUrls:['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy{
    authenticated = false;
    authSubs: Subscription;

    constructor(private dataService: DataStorageService, private authService:AuthService){}


    ngOnInit(): void {
        this.authSubs = this.authService.user.subscribe((user:UserModel)=>{
            this.authenticated = !user ? false : true;
        });
    }
    ngOnDestroy(): void {
        this.authSubs.unsubscribe();
    }

    onSave(){
        this.dataService.storeRecipes().subscribe();
    }

    onFetch(){
        this.dataService.fetchRecipes().subscribe();
    }

    onLogout(){
        this.authService.logout();
    }
}