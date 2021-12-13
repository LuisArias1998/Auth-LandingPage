import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpecificBlogService {
  public blog:any;
  constructor() { }
  setBlog(bl:any){
    console.log("Seteando el blog ",bl);
    this.blog=bl;
  }
  getBlog(){
    console.log("Geteando el blog ",this.blog);
    return this.blog;
    
  }
}
