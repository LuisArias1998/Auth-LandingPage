import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Register } from '../models/register';
@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  API_URI="http://localhost:3000";
  constructor(private http:HttpClient) { 
  }

  createUser(register:Register){
    return this.http.post(`${this.API_URI}/registro`,register);
  }
  createUserPago(register:Register){
    return this.http.post(`${this.API_URI}/pago/registroPago`,register);
  }
}
