import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public get isUserAuthenticated(): boolean {return this._authService.isUserAuthenticated()};

  @Output() public sidenavToggle = new EventEmitter();

  constructor(private _authService: AuthenticationService, private _router: Router) { }

  ngOnInit() {
  }
  
  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

  public navigateToAccount(){
    this._router.navigate(['/profile/me']);
  }

  public logout() {
    this._authService.logout();
  }
}
