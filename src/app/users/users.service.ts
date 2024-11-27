import { Injectable } from '@angular/core';
import { HttpService } from '../core/http.service';

@Injectable()
export class UsersService {
  constructor(private httpService: HttpService) {}

  register(user: any) {
    return this.httpService.post('auth/register', user);
  }

  getProfile(id?: any) {
    if (id) {
      return this.httpService.get(`users/profile/${id}`);
    } else {
      return this.httpService.get(`users/profile`);
    }
  }

  editProfile(user: any) {
    return this.httpService.post('users/profile', user);
  }

  login(user: any) {
    return this.httpService.post('auth/login', user);
  }

  list(query?: any) {
    return this.httpService.get(`users/list${query}`);
  }

  like(id: any) {
    return this.httpService.post(`matches/like/${id}`, {});
  }

  dislike(id: any) {
    return this.httpService.post(`matches/unlike/${id}`, {});
  }
}
