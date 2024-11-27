import { Component } from '@angular/core';
import { RegisterUserModel } from './register-user.model';
import { Router } from '@angular/router';

import { IAppState } from '../../store';

import { UsersActions } from '../../store/users/users.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  user: RegisterUserModel = new RegisterUserModel();

  constructor(
    private userActions: UsersActions,
    private ngRedux: Store<IAppState>,
    private router: Router
  ) {}
  register() {
    this.userActions.register(this.user);
    this.ngRedux
      .select(
        (state: { users: { userRegistered: any } }) =>
          state.users.userRegistered
      )
      .subscribe((userRegistered: any) => {
        if (userRegistered) {
          this.router.navigateByUrl('users/login');
        }
      });
  }
}
