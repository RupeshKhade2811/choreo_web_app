import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  constructor(private http: HttpClient) {}

  getToken(): Observable<string> {
    const url = 'https://api.asgardeo.io/t/orgenox1/oauth2/token';
    const headers = {
      Authorization: 'Basic R1dCWWRPNVo3Z1ZkX255V29pWnJjb3B3T2NnYTp0aVVZUzZNR2RmWkM0dllWNlFBMDdFQVJ2X1BzY1JGbXdXRno4RjE5N1JFYQ==',
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    const body = 'grant_type=client_credentials';

    return this.http.post<any>(url, body, { headers }).pipe(
      map(response => response.access_token)
    );
  }
}