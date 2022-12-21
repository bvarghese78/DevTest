import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
})

export class AuthGuardService implements CanActivate{
    constructor(private authService: AuthService, public router: Router) {}

    canActivate(){
        if(!this.authService.isAuthenticated()){
            this.router.navigateByUrl('/Login');
            return false;
        }

        return true;
    }
}