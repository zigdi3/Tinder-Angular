import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UsersService } from './users.service';
import { UsersActions } from '../store/users/users.actions';

import { RegisterComponent } from './register/register.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { ListComponent } from './profile/list/list.component';
import { ProfileComponent } from './profile/profile.component';
import { UpdateProfileComponent } from './profile/update/update-profile.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    RouterModule,
  ],
  declarations: [
    RegisterComponent,
    ListComponent,
    ProfileComponent,
    UpdateProfileComponent,
  ],
  providers: [UsersService, UsersActions],
})
export class UsersModule {}
