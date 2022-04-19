import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvironmentUrlService } from './environment-url.service';
import { RegistrationRequest } from 'src/app/_interfaces/registration_request.model';
import { RegistrationResponse } from 'src/app/_interfaces/registration_reponse.model';
import { LoginRequest } from 'src/app/_interfaces/login_request.model';
import { Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginResponse } from 'src/app/_interfaces/login_response.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private _authChangeSub = new Subject<boolean>();
  public authChanged = this._authChangeSub.asObservable();

  constructor(private _http: HttpClient, private _envUrl: EnvironmentUrlService, private _jwtHelperService: JwtHelperService, private _router: Router) { }

  public isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem("token");
    return token && !this._jwtHelperService.isTokenExpired(token);
  }

  public registerUser = (route: string, body: RegistrationRequest) => {
    let message = JSON.stringify(body);
    return this._http.post<RegistrationResponse>(this.createCompleteRoute(route, this._envUrl.urlAddress), message, this.generateHeaders());
  }

  public login = (route: string, body: LoginRequest, returnUrl: string) => {
    let message = JSON.stringify(body);
    this._http.post(
      this.createCompleteRoute(route, this._envUrl.urlAddress), message, this.generateHeaders()
    ).subscribe({
      next: (v: LoginResponse) => {
        localStorage.setItem("token", v.token);
        // this._authService.sendAuthStateChangeNotification(v.isLoginSuccessful);
        this._router.navigate([returnUrl]);
      },
      error: (e) => {
        console.log(e.error.errors);
      },
      complete: () => {}
    })
  }

  public logout() {
    // Might want to send a request to the server to invalidate the existing token...
    console.log('User logged out')
    localStorage.removeItem('token');
    this._router.navigate(['/']);
  }

  public sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
    console.log("Authentication State Changed")
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
