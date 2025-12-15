import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../app/environments/environment";

@Injectable({ providedIn: 'root' })
export class AuthService {
  private backendUrl = environment.backendUrl;

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.backendUrl}/auth/login`, credentials);
  }

  register(data: { name: string; email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.backendUrl}/auth/register`, data);
  }

  logout() {
    sessionStorage.removeItem('token');
    console.log('Sesion cerrada');
  }

  isLogged(): boolean {
    return !!sessionStorage.getItem('token');
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }
}
