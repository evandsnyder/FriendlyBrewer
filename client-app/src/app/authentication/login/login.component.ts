import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { LoginRequest } from 'src/app/_interfaces/login_request.model';
import { LoginResponse } from 'src/app/_interfaces/login_response.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public errorMessage: string = '';
  public showError: boolean;
  private _returnUrl: string;

  public hide: boolean = true;

  constructor(private _authService: AuthenticationService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

    this._returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
  }

  public validateControl = (controlName: string) => {
    return this.loginForm.controls[controlName].invalid && this.loginForm.controls[controlName].touched;
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  }

  public login = (loginFormValue: any) => {
    this.showError = false;
    const loginData = { ...loginFormValue };
    const loginRequest: LoginRequest = {
      email: loginData.email,
      password: loginData.password
    }

    let sub: Subscription = this._authService.login('/auth/login', loginRequest).subscribe({
      next: (v: LoginResponse) => {
        localStorage.setItem("token", v.token);
        this._router.navigate([this._returnUrl]);
      }, error: (e) => { console.log(e.error.errors); },
      complete: () => {
        sub.unsubscribe();
      }
    });
  }

}
