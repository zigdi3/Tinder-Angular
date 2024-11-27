import { ProfileModel } from './profile-user.model';
import { Component, OnInit } from '@angular/core';

import { IAppState } from '../../store';
import { UsersActions } from '../../store/users/users.actions';

import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  public id!: string;
  public profile!: ProfileModel;

  constructor(
    private ngRedux: Store<IAppState>,
    private usersActions: UsersActions,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];

      this.fetch();
    });

    this.ngRedux
      .select((state) => state.users)
      .subscribe((usersState: any) => {
        this.profile = usersState.profile;
      });
  }

  fetch() {
    this.usersActions.getProfile(this.id);
  }
}
