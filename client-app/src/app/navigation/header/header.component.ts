import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isUserAuthenticated: boolean;

  @Output() public sidenavToggle = new EventEmitter();

  constructor(private _authService: AuthenticationService) { }

  ngOnInit() {
    let sub: Subscription = this._authService.authChanged.subscribe({
      next: (isLoggedIn) => this.isUserAuthenticated = isLoggedIn,
      complete: () => sub.unsubscribe()
    });
  }
  
  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }
}
