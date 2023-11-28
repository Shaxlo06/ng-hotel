import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  logIn(data: any) {
    return this.http.get<any>("http://localhost:3000/users")
  }

  registr(data: any) {
    return this.http.post<any>("http://localhost:3000/users", data)
  }

  updateDetails(data: any) {
    return this.http.put<any>("http://localhost:3000/users/"+ data.id, data)
  }

}
