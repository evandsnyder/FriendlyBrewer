import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { RegistrationRequest } from 'src/app/_interfaces/registration_request.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  public registrationForm: FormGroup;
  public hide: boolean = true;

  constructor(private _authService: AuthenticationService) { }

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirm: new FormControl('')
    });
  }

  public validateControl = (controlName: string) => {
    return this.registrationForm.controls[controlName].invalid && this.registrationForm.controls[controlName].touched;
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.registrationForm.controls[controlName].hasError(errorName);
  }

  public register = (registrationFormValue: any) => {
    const formValues = { ...registrationFormValue };
    const user: RegistrationRequest = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      password: formValues.password,
      confirmPassword: formValues.confirm
    };

    let sub: Subscription = this._authService.registerUser("/auth/signup", user).subscribe({
      next: (v) => {
        v.isSuccessfulRegistration ? console.log("Registered Successfully") : console.log("Failed to register");
      },
      error: (e) => console.log(e.error.errors),
      complete: () => sub.unsubscribe()
    });
  };
}
