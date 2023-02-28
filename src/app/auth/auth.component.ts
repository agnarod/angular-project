import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  mode:number = 0;
  isLoadding = false;
  error: string = null;

  modSubs: Subscription;
  errorSubs: Subscription;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    
    this.modSubs = this.authService.changeMode.subscribe((mode)=>{
      this.mode = mode;
    });
    this.errorSubs = this.authService.showError.subscribe( message=>{
      this.error = message;
      
    })
  }

  ngOnDestroy(): void {
    //throw new Error('Method not implemented.');
    this.modSubs.unsubscribe();
    this.errorSubs.unsubscribe();
  }



}
