import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './auth.service';
import { AlertComponent } from '../shared/alert/alert.component'
import { PlaceholderDirective } from '../shared/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  mode:number = 0;
  isLoadding = false;
  error: string = null;

  @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;

  modSubs: Subscription;
  errorSubs: Subscription;
  alertSubs: Subscription;
  constructor(private authService: AuthService, private componentFactResolv: ComponentFactoryResolver) { }

  ngOnInit(): void {
    
    this.modSubs = this.authService.changeMode.subscribe((mode)=>{
      this.mode = mode;
    });
    this.errorSubs = this.authService.showError.subscribe( message=>{
      this.error = message;
      this.showErrorAlert(message);
    })
  }

  ngOnDestroy(): void {
    //throw new Error('Method not implemented.');
    this.modSubs.unsubscribe();
    this.errorSubs.unsubscribe();
    if(this.alertSubs)this.alertSubs.unsubscribe();
  }


  private showErrorAlert(message:string){
    const alertCmpFact = this.componentFactResolv.resolveComponentFactory(AlertComponent);

    const hostViewContRef = this.alertHost.viewContainerRef;
    hostViewContRef.clear();
    const componentRef = hostViewContRef.createComponent(alertCmpFact);
    componentRef.instance.message = message;
    this.alertSubs = componentRef.instance.close.subscribe(()=>{
      this.alertSubs.unsubscribe();
      hostViewContRef.clear();
    });
     
  }



}
