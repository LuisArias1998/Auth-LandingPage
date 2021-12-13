import { Component, OnInit, ElementRef, Renderer2, HostListener } from '@angular/core';
import { Location} from '@angular/common';
import {FormGroup, FormControl} from '@angular/forms' 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private toggleButton: any;
  private sidebarVisible: boolean;
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  }); 
  constructor(public el: ElementRef, private renderer: Renderer2, public location: Location) { 
    this.sidebarVisible = false;
  }
  @HostListener('window:scroll', ['$event'])

ngOnInit(): void {
     var navbar = document.getElementById("navegacion")
     navbar.classList.add('navbar-transparent');
     this.renderer.listen('window', 'scroll', (event) => {
         const number = window.scrollY;
         if (number > 150 || window.pageYOffset > 150) {
             // add logic
             navbar.classList.remove('navbar-transparent');
         } else {
             // remove logic
             navbar.classList.add('navbar-transparent');
         }    
     });
     const nav: HTMLElement = this.el.nativeElement;
        this.toggleButton = nav.getElementsByClassName('navbar-toggler')[0];
}
sidebarToggle() {
  // const toggleButton = this.toggleButton;
  // const body = document.getElementsByTagName('body')[0];
  if (this.sidebarVisible === false) {
      this.sidebarOpen();
  } else {
      this.sidebarClose();
  }
  };
  sidebarOpen() {
      this.sidebarVisible=true;
      const toggleButton = this.toggleButton;
      const html = document.getElementsByTagName('html')[0];
      setTimeout(function(){
          toggleButton.classList.add('toggled');
      }, 500);
      html.classList.add('nav-open');
      

  };
  sidebarClose() {
      const html = document.getElementsByTagName('html')[0];
      // console.log(html);
      this.toggleButton.classList.remove('toggled');
      this.sidebarVisible = false;
      html.classList.remove('nav-open');
  };
  onLogin(){
    console.log("form ",this.loginForm.value);
 };
  date : Date = new Date();

}
