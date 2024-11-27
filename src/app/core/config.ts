import { NavigationStart } from '@angular/router';

import { ROUTES_CHANGE } from '../store/core/core.actions';
import { USER_LOGGED_IN } from '../store/users/users.actions';

export function config(ngRedux: any, router: any, authService: any) {
  router.events.subscribe((ev: any) => {
    if (ev instanceof NavigationStart) {
      ngRedux.dispatch({
        type: ROUTES_CHANGE,
      });
    }
  });

  if (authService.isUserAuthenticated()) {
    const token = authService.getToken();
    const username = authService.getUser();

    ngRedux.dispatch({
      type: USER_LOGGED_IN,
      result: {
        success: true,
        token,
        user: {
          name: username,
        },
      },
    });
  }
}
