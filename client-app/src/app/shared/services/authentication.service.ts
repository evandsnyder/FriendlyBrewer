import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvironmentUrlService } from './environment-url.service';
import { RegistrationRequest } from 'src/app/_interfaces/registration_request.model';
import { RegistrationResponse } from 'src/app/_interfaces/registration_reponse.model';
import { LoginRequest } from 'src/app/_interfaces/login_request.model';
import { Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private _authChangeSub = new Subject<boolean>();
  public authChanged = this._authChangeSub.asObservable();

  constructor(private _http: HttpClient, private _envUrl: EnvironmentUrlService, private _jwtHelperService: JwtHelperService) { }

  public isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem("token");
    return token && !this._jwtHelperService.isTokenExpired(token);
  }

  public registerUser = (route: string, body: RegistrationRequest) => {
    let message = JSON.stringify(body);
    console.log(`Sending: ${message}`);
    return this._http.post<RegistrationResponse>(this.createCompleteRoute(route, this._envUrl.urlAddress), message, this.generateHeaders());
  }

  public login = (route: string, body: LoginRequest) => {
    let message = JSON.stringify(body);
    console.log(`Sending: ${message}`);
    return this._http.post(this.createCompleteRoute(route, this._envUrl.urlAddress), message, this.generateHeaders());
  }

  public sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
    this._authChangeSub.next(isAuthenticated);
  }

  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}${route}`;
  }

  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
  }
}
