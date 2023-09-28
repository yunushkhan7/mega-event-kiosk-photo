import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  getToken() {
    return sessionStorage.getItem('token');
  }

  destroyToken(){
    return sessionStorage.removeItem('token');
  }
}
