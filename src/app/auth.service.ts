import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(`${this.baseUrl}/login`, { username, password }, { headers })
      .pipe(
        catchError(error => {
          console.error('Login error:', error);
          console.error('Error details:', error.error);
          return throwError(error);
        })
      );
  }

  signup(username: string, password: string, email: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(`${this.baseUrl}/signup`, { username, password, email }, { headers })
      .pipe(
        catchError(error => {
          console.error('Signup error:', error);
          console.error('Error details:', error.error);
          return throwError(error);
        })
      );
  }

 
  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }


  getToken(): string | null {
    return localStorage.getItem('authToken');
  }


  logout(): void {
    localStorage.removeItem('authToken');
  }
}
