import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  
  authForm: FormGroup;
  error: string = null;
  constructor(private authServ: AuthService){}

  ngOnInit(): void {
    this.authForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(8)])
    });
  }
  ngOnDestroy(): void {
    //throw new Error('Method not implemented.');
  }

  
  onSwitchMode() {
    this.authServ.changeLogingMode(1);
  }

  onSubmit(){

    if (!this.authForm.valid)
      return;
      this.authServ.changeLogingMode(2);
      const values = this.authForm.value;

      const data = {email:values.email, password: values.password}
      
      this.authServ.login(data).subscribe(
        (responseData)=>{
          this.authServ.changeLogingMode(0);
          this.authServ.changeError('');
          
        },
        (errorRes) => {
          this.authServ.changeLogingMode(0);
          this.authServ.changeError(errorRes);
        }
      )
  }

}
