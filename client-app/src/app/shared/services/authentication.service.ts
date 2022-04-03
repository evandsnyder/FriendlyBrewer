import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvironmentUrlService } from './environment-url.service';
import { RegistrationRequest } from 'src/app/_interfaces/registration_request.model';
import { RegistrationResponse } from 'src/app/_interfaces/registration_reponse.model';
import { LoginRequest } from 'src/app/_interfaces/login_request.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private _http: HttpClient, private _envUrl: EnvironmentUrlService) { }

  public registerUser = (route: string, body: RegistrationRequest) => {
    return this._http.post<RegistrationResponse>(this.createCompleteRoute(route, this._envUrl.urlAddress), body);
  }

  public login = (route: string, body: LoginRequest) =>{
    return this._http.post(this.createCompleteRoute(route, this._envUrl.urlAddress), body);
  }

  private createCompleteRoute = (route: string, envAddress: string) =>{
    return `${envAddress}/${route}`;
  }
}
