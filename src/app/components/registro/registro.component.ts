import { Component, OnInit, HostListener, ElementRef, Renderer2 } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Location} from '@angular/common';
import {FormGroup, FormControl} from '@angular/forms' 


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  }); 
  private toggleButton: any;
  private sidebarVisible: boolean;
  constructor(public modal:NgbModal, public el: ElementRef, private renderer: Renderer2, public location: Location) {
    this.sidebarVisible = false;
   }

   @HostListener('window:scroll', ['$event'])

   ngOnInit(): void {
         var navbar = document.getElementById("navegacion")
         navbar.classList.add('navbar-transparent');
         this.renderer.listen('window', 'scroll', (event) => {
             const number = window.scrollY;
             if (number > 100 || window.pageYOffset > 100) {
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
         this.sidebarVisible = true;
         this.sidebarOpen();
 
     } else {
         this.sidebarClose();
     }
     };
     sidebarOpen() {
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
     onRegister(){
         console.log("form ",this.registerForm.value);
     }
 
 }
 