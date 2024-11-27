import { Injectable } from '@angular/core';
import { IAppState } from '..';
import { Store } from '@ngrx/store';
import { MatchesService } from '../../matches/matches.service';

export const MATCHES_LOAD = 'matches/LOAD';
export const MESSAGES_LOAD = 'messages/LOAD';

@Injectable()
export class MatchesActions {
  constructor(
    private matchesService: MatchesService,
    private ngRedux: Store<IAppState>
  ) {}

  fetchMatches() {
    this.matchesService.getMyMatches().subscribe((matches: any) => {
      this.ngRedux.dispatch({
        type: MATCHES_LOAD,
        matches,
      });
    });
  }

  fetchMessages(id: any) {
    this.matchesService
      .getMessages(id)
      .subscribe((response: { success: boolean }) => {
        if (response.success !== false) {
          this.ngRedux.dispatch({
            type: MESSAGES_LOAD,
            messages: response,
          });
        } else {
          console.log(response); // Render error message
        }
      });
  }

  sendMessage(id: any, message: any) {
    this.matchesService.sendMessage(id, message).subscribe((response: any) => {
      if (response.success !== false) {
        this.ngRedux.dispatch({
          type: MESSAGES_LOAD,
          messages: response,
        });
      } else {
        console.log(response); // Render error message
      }
    });
  }
}
