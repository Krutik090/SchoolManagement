import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl; // Your Backend URL

  constructor(private http: HttpClient, private router: Router) { }

  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, data, { withCredentials: true }); // Enable credentials for cookies
  }

  getRole(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/auth/role`, { withCredentials: true });
  }

  isLoggedIn(): Observable<boolean> {
    return this.http.get<{ isAuthenticated: boolean }>(`${this.apiUrl}/auth/is-authenticated`, { withCredentials: true }).pipe(
      map(response => response.isAuthenticated),
      catchError(() => of(false)) // Return false if request fails
    );
  }

  logout(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/logout`, {}, { withCredentials: true }).pipe(
      tap(() => {
        this.router.navigateByUrl('/login'); // Redirect after logout
      })
    );
  }
}
