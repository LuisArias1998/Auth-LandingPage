import { Component, OnInit, ElementRef, Renderer2, HostListener } from '@angular/core';
import { Location} from '@angular/common';
import {FormGroup, FormControl} from '@angular/forms' 
import { AuthenticationService } from '../../services/authentication.service';
import Swal from 'sweetalert2';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private toggleButton: any;
  private sidebarVisible: boolean;
  public ban;

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  }); 
  constructor(public el: ElementRef, private renderer: Renderer2, public location: Location, 
    public auth:AuthenticationService, public afs: AngularFirestore) { 
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
  async onLogin(){
    const{email,password} =this.loginForm.value;
    try{
    const user= await this.auth.login(email,password);
      if(user && user.user.emailVerified){
        Swal.fire({
          icon: 'success',
          title: 'Completado!...',
          text: 'Iniciaste sesión'
        })
      }else if(user){
        Swal.fire({
          icon: 'warning',
          title: 'Atención',
          text: 'Por favor confirme su email con el correo de verificación'
        })
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops!...',
          text: 'Correo o contraseña incorrecta'
        })
      }
    }catch(error){

    }

 };

  date : Date = new Date();

}
