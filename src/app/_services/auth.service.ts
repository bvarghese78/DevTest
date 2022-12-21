import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, take } from "rxjs";
import { AuthResponseDto } from "../_models/auth-response-dto";
import { Login } from "../_models/login";
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root'
})

export class AuthService { 
    /**
     *
     */
    constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }
    
    authUser(user: Login) : Observable<AuthResponseDto> {
        const requestUri = 'https://localhost:7016/api/Connect/authenticate';

        return this.http.post<AuthResponseDto>(requestUri, user)
            .pipe(
                take(1)
            )
    }

    isAuthenticated(): boolean {
        const token = localStorage.getItem('token');

        //Checks whether token has expired or not.
        return !this.jwtHelper.isTokenExpired(token);
    }
}