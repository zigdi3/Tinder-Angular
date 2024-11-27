import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const ROOT_PATH = 'http://localhost:5000/';

@Injectable()
export class HttpService {
  options: any;
  headers = new HttpHeaders();

  constructor(private http: HttpClient, private authService: AuthService) {
    this.headers = this.getAuthHeaders();
    // this.options = new HttpHeaders( this.headers);
  }

  get(path: string): Observable<any> {
    this.applyAuthorizationHeader();
    return this.http.get(ROOT_PATH + path, { headers: this.getAuthHeaders() });
  }

  post(path: any, data: any) {
    this.applyAuthorizationHeader();
    return this.http.post(ROOT_PATH + path, JSON.stringify(data), {
      headers: this.getAuthHeaders(),
    });
  }

  delete(path: any) {
    this.applyAuthorizationHeader();
    return this.http.delete(ROOT_PATH + path, {
      headers: this.getAuthHeaders(),
    });
  }

  getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  applyAuthorizationHeader() {
    const authHeaders = new HttpHeaders();
    if (this.authService.isUserAuthenticated()) {
      authHeaders.set('Authorization', `bearer ${this.authService.getToken()}`);
      return;
    }
    authHeaders.set('Authorization', '');
    this.headers = authHeaders;
  }
}
