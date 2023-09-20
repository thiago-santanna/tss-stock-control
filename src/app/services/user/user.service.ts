import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISignupUserRequest } from 'src/app/models/interfaces/user/ISignupUserRequest';
import { ISignupUserResponse } from 'src/app/models/interfaces/user/ISignupUserResponse';
import { IAuthRequest } from 'src/app/models/interfaces/user/auth/IAuthRequest';
import { IAuthResponse } from 'src/app/models/interfaces/user/auth/IAuthResponse';
import { environment } from 'src/environments/environments';
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private cookie: CookieService) {}

  private API_URL = environment.API_URL;

  signupUser(requestData:ISignupUserRequest): Observable<ISignupUserResponse> {
    return this.http.post<ISignupUserResponse>(`${this.API_URL}/user`, requestData);
  }

  authUser(requestData:IAuthRequest): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>(`${this.API_URL}/auth`, requestData);
  }

  idLogeeIn():boolean {
    // true deixa passar - false não deixa passar
    const JWT_TOKEN:string = this.cookie.get('USER_INFO');
    return !!JWT_TOKEN; // é a mesma coisa de JWT_TOKEN ? true : false
  }
}
