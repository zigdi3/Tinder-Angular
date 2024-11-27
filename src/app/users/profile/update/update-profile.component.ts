import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IAppState } from '../../../store';
import { UsersActions } from '../../../store/users/users.actions';

import { ProfileModel } from '../profile-user.model';

import { AuthService } from '../../../core/auth.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'update-profile',
  templateUrl: './update-profile.component.html',
})
export class UpdateProfileComponent implements OnInit {
  user!: ProfileModel;

  constructor(
    private ngRedux: Store<IAppState>,
    private usersActions: UsersActions,
    private router: Router
  ) {}

  ngOnInit() {
    this.usersActions.getProfile();
    this.ngRedux
      .select((state) => state.users)
      .subscribe((users: any) => {
        this.user = users.profile;
      });
  }

  update() {
    this.usersActions.updateProfile(this.user).subscribe((result: any) => {
      if (result.success) {
        this.router.navigate(['/users/profile']);
      } else {
        console.error(result.message);
      }
    });
  }
}
