import { Injectable } from '@angular/core';
import {UserService} from "../services/user/user.service";
import {Router, UrlTree} from "@angular/router";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private userService: UserService, private router: Router) { }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree{
    if(this.userService.idLogeeIn()){
      return true;
    } else {
      return this.router.parseUrl('/home');
    }
  }
}
