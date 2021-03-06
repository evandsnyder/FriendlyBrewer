import { Component } from '@angular/core';
import { AuthenticationService } from './shared/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Friendly Brewer';

  constructor(private _authService: AuthenticationService){}

  ngOnInit(): void {
    if(this._authService.isUserAuthenticated())
      this._authService.sendAuthStateChangeNotification(true);
  }
}
