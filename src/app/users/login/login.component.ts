import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { IAppState } from '../../store';
import { UsersActions } from '../../store/users/users.actions';

import { AuthService } from '../../core/auth.service';

import { LoginUserModel } from './login-user.model';
import { Store } from '@ngrx/store';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  user: LoginUserModel = new LoginUserModel();

  constructor(
    private usersActions: UsersActions,
    private authService: AuthService,
    private router: Router,
    private ngRedux: Store<IAppState>
  ) {}

  login() {
    this.usersActions.login(this.user);
    this.ngRedux
      .select((state) => state.users)
      .subscribe((users) => {
        if (users.userAuthenticated) {
          this.authService.authenticateUser(users.token);
          this.authService.saveUser(users.username);

          this.router.navigateByUrl('');
        }
      });
  }
}
