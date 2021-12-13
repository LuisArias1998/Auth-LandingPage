import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Blogs } from '../models/Blogs'

@Injectable({
  providedIn: 'root'
})
export class BlogsService {

  API_URI="http://localhost:3000";
  constructor(private http:HttpClient) { 


  }

  getBlogs(){
    return this.http.get(`${this.API_URI}/zitheonsoft/blogs/fill`)
  }
  getBlog(id:string){
    return this.http.get(`${this.API_URI}/zitheonsoft/blogs/fill/${id}`);
  }
  createBlogs(blog:Blogs){
    return this.http.post(`${this.API_URI}/zitheonsoft/blogs/fill`,blog);
  }
}
