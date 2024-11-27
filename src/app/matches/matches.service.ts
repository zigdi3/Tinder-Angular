import { Message } from './message';
import { Match } from './match';
import { AuthService } from '../core/auth.service';
import { HttpService } from '../core/http.service';
import { Injectable } from '@angular/core';

@Injectable()
export class MatchesService {
  constructor(
    private httpService: HttpService,
    private authService: AuthService
  ) {}

  getMyMatches() {
    return this.httpService.get('matches/mine');
  }

  getMessages(id: any) {
    return this.httpService.get(`chat/${id}`);
  }

  sendMessage(id: any, message: any) {
    return this.httpService.post(`chat/${id}/send`, { message });
  }

  convertDbMatchToModel(match: {
    user1: { user: { email: string | null } };
    user2: any;
    _id: any;
    timestamp: string | number | Date;
  }): Match {
    const currentEmail = this.authService.getUser();
    let currentuser: any;
    let otherUser: any;

    if (match.user1.user.email === currentEmail) {
      otherUser = match.user2;
      currentuser = match.user1;
    } else {
      otherUser = match.user1;
      currentuser = match.user2;
    }

    return {
      id: match._id,
      user: otherUser.user,
      timestamp: new Date(match.timestamp),
      seen: currentuser.seen,
    };
  }

  convertDbMessageToModel(message: {
    from: { email: string | null; name: any };
    message: any;
    timestamp: string | number | Date;
  }): Message {
    const currentEmail = this.authService.getUser();
    let style: string;

    if (message.from.email === currentEmail) {
      style = 'right';
    } else {
      style = 'left';
    }

    return {
      text: message.message,
      style,
      sent: new Date(message.timestamp),
      from: message.from.name,
    };
  }
}
