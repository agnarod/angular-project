 import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, catchError, Subject, tap, throwError } from "rxjs";
import { UserModel } from "./user.model";

export interface AuthResponseData {
    tokenId: string,
    email: string,
    expiresIn: number,
    userId: string
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    url: string = "http://localhost:8080/recipebook/users";

    user = new BehaviorSubject<UserModel>(null);
    
    private mode:number = 0;
    private error: string;
    changeMode = new Subject<number>();
    showError = new Subject<string>();
    private expiresIn;

    constructor(private http: HttpClient, private router:Router) { }

    singup(data: { firstname: string, lastname: string, username: string, email: string, password: string }) {

        return this.http.post<AuthResponseData>(this.url, JSON.stringify(data),
        {
            headers: new HttpHeaders().set("Content-Type","application/json")
        })
            .pipe(
                catchError(this.handleError),
                tap(
                    (respData) => {
                        
                        this.storageUser(respData);
                    }
                ));
    }

    login(data: { email: string, password: string }) {

        return this.http.post<AuthResponseData>(this.url + "/login", {
            email: data.email,
            password: data.password
        },
        { observe: 'response' })
        .pipe(
            catchError(this.handleError),
            tap(
                (respData) => {
                    const token = respData.headers.get("authorization").split(' ');
                    const finalData: AuthResponseData = {
                        tokenId: token[1],
                        email: respData.headers.get("email"),
                        expiresIn: +respData.headers.get("expiresIn"),
                        userId: respData.headers.get("userId")
                    }
                    this.storageUser(finalData);
                }

            )
        );

    }

    logout(){
        this.user.next(null);
        localStorage.removeItem('userData');
        this.router.navigate(['/auth']);
    }

    private storageUser(respData: AuthResponseData) {

        console.log(new Date().getTime());
        console.log(new Date());
        console.log(respData.expiresIn);
        
        const expDate = new Date(new Date().getTime() + respData.expiresIn);
        console.log(expDate);
        
        const user = new UserModel(
            respData.email, respData.userId, respData.tokenId, expDate
        );
        
        this.user.next(user);
        this.autoLogout(respData.expiresIn);
        localStorage.setItem('userData', JSON.stringify(user));
        this.router.navigate(['/recipes']);
        this.expiresIn = null;
    }

    autoLogout(expiresIn: number){
        this.expiresIn = setTimeout(()=>{this.logout()}, expiresIn)
    }

    autoLogin(){
        const userData:{
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: String} = JSON.parse(localStorage.getItem('userData'));
        if(!userData) return;

        
        const user = new UserModel(
            userData.email, 
            userData.id, 
            userData._token, 
            new Date(userData._tokenExpirationDate.replace("z",""))
        );
        
        if(user.token){
            this.user.next(user);
            const expTime = new Date(userData._tokenExpirationDate.replace("z","")).getTime() - new Date().getTime(); 
            this.autoLogout(expTime);
        }
        else
        this.logout();
    }



    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unkown error ocurred!';
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage)
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'User already exist!';
                break
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'User not found!';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'Invalid password!';
                break;
            case 'USER_DISABLED':
                errorMessage = 'This user is disabled!';
                break;
        }
        return throwError(errorMessage);
    }

    changeLogingMode(type:number) {
        this.mode = type;
        this.changeMode.next(this.mode);

    }
    changeError(error:string){
        this.error = error;
        this.showError.next(this.error);
    }
}