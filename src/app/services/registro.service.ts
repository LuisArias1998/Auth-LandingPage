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

  createBlogs(register:Register){
    return this.http.post(`${this.API_URI}/zitheonsoft/blogs/fill`,register);
  }
}
