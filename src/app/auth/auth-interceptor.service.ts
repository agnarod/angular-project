import { Injectable } from "@angular/core";
import{ HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { exhaustMap, Observable, take } from "rxjs";
import { AuthService } from "./auth.service";
import { UserModel } from "./user.model";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{

    constructor(private authService: AuthService){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

        return this.authService.user.pipe(take(1),
        exhaustMap( (user:UserModel)=>{
            if(!user){ return next.handle(req);}
            
            const modifiedReq = req.clone({
                headers: new HttpHeaders()
                .set("Authorization", "Bearer "+user.token)
                .set("Content-Type","application/json")
            });
            
            return next.handle(modifiedReq);
        }
        ))
    }

}