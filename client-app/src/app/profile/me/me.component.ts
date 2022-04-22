import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { User } from 'src/app/_interfaces/user.model';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss'],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }
  ]
})
export class MeComponent implements OnInit {
  public loaded: boolean = false;

  public user: User;
  public updateUserInfoForm: FormGroup;
  public updatePasswordForm: FormGroup;

  constructor(private repository: RepositoryService) { }

  ngOnInit(): void {
    let repoSub = this.repository.getData('users/me').subscribe({
      next: (res) => {
        this.user = res as User;
        this.loaded = true;
        this.updateUserInfoForm = new FormGroup({
          firstName: new FormControl(this.user.first_name),
          lastName: new FormControl(this.user.last_name),
          email: new FormControl(this.user.email)
        });
      },
      complete: () => repoSub?.unsubscribe()
    });
    

    this.updatePasswordForm = new FormGroup({
      password: new FormControl(),
      confirm: new FormControl()
    })
  }

  public updateAccount(event: Event){
    event.stopPropagation();
    console.log("Updating account information!");
  }

  public updatePassword(event: Event){
    event.stopPropagation();
    console.log("Updating password!");
  }
}
