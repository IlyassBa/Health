import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private http: HttpClient) { }

  postUser(data: string) {
    const JSONData = {
      "name": data
    };
    const url = 'http://localhost:3000/auth-qr';
    return this.http.post(url, JSONData);
  }

  // verifyCode(code: string) {
  //   const JSONData = {
  //     "code": code
  //   };
  //   const url = 'http://localhost:3000/auth-qr';
  //   return this.http.post(url, JSONData);
  // }

  verifyCode(code: string, name: string) {
    const JSONData = {
      "code": code,
      "name": name
    };
    const url = 'http://localhost:3000/verify-token';
    return this.http.post(url, JSONData);
  }
}