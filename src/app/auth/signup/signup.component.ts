import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {


  authForm: FormGroup;

  constructor(private authServ: AuthService) { }


  ngOnInit(): void {
    this.authForm = new FormGroup({
      'firstname': new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      'lastname': new FormControl(null, [Validators.required, Validators.max(80)]),
      'username': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(8)]),
      'repeatPassword': new FormControl(null, [Validators.required, Validators.minLength(8)])
    });
  }
  ngOnDestroy(): void {
    //throw new Error('Method not implemented.');
  }

  onSwitchMode() {
    this.authServ.changeLogingMode(0);
  }

  onSubmit() {
    if (!this.authForm.valid)
      return;

      const values = this.authForm.value;
      if(values.password != values.repeatPassword)
      return;
      
      this.authServ.changeLogingMode(2);

      const data = {firstname: values.firstname, lastname:values.lastname, username:values.username, email:values.email, password: values.password}
      
      this.authServ.singup(data).subscribe(
        (responseData)=>{
          this.authServ.changeLogingMode(1);
          
        },
        (errorRes) => {
          this.authServ.changeLogingMode(1);
          
        }
      )
      
  }
}
