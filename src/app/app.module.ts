import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { UsersModule } from './users/users.module';
import { MaterialModule } from './material.module';
import { coreReducer } from './store/core/core.reducer';
import { usersReducer } from './store/users/users.reducer';
import { StoreModule } from '@ngrx/store';
import { matchesReducer } from './store/matches/matches.reducer';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({
      core: coreReducer,
      users: usersReducer,
      matches: matchesReducer,
    }),
    CoreModule,
    MaterialModule,
    UsersModule,
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
