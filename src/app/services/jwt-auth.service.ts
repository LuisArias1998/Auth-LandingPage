import { Injectable } from '@angular/core';
import { LocalStorageJwt } from '../static/local-storage';
import jwt_decode from 'jwt-decode';
import { IJwt } from '../models/Auth';

@Injectable({
  providedIn: 'root'
})
export class JwtAuthService {

  constructor() { }

  login(token:string):void{
    console.log("Sí entró");
    const decode = jwt_decode<IJwt>(token);
    localStorage.setItem(LocalStorageJwt.LS_ACCESS_TOKEN,token);
  }
  isLoggedIn():boolean{
    const lsToken=localStorage.getItem(LocalStorageJwt.LS_ACCESS_TOKEN);
    if(!lsToken){
      return false;
    }
    return true;
  }
}
