import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { User } from 'src/app/_interfaces/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  public _loaded: boolean = false;
  public user: User;

  constructor(private _router: Router, private _activedRoute: ActivatedRoute, private _repository: RepositoryService) { }

  ngOnInit(): void {
    this.loadUser();
  }

  private loadUser() {
    // This seems inefficient. I hope there is a better way to do this...
    let routeSub = this._activedRoute.params.subscribe({
      next: params => {
        if (!params['id']){
          console.log("It seems we're having a hard time finding that user...")
          return;
        }
        let id = params['id'];
        let repoSub = this._repository.getData(`users/${id}`).subscribe({
          next: res => {
            // TODO: For whatever reason, the API does not return related elements... got to find out why.
            this.user = res as User;
            this._loaded = true;
          },
          complete: () =>{
            repoSub?.unsubscribe();
          }
        });
      },
      complete: () => {
        if (routeSub) routeSub.unsubscribe();
      }
    });
    
  }

}
