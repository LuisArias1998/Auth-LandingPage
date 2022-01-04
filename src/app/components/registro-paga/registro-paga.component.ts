import { Component, OnInit, ElementRef, Renderer2, HostListener  } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Location} from '@angular/common';
import {FormGroup, FormControl} from '@angular/forms' 
import { AuthenticationService } from '../../services/authentication.service';

import Swal from 'sweetalert2'

import { RegistroService } from '../../services/registro.service';
import { Register } from '../../models/register';
@Component({
  selector: 'app-registro-paga',
  templateUrl: './registro-paga.component.html',
  styleUrls: ['./registro-paga.component.scss']
})
export class RegistroPagaComponent implements OnInit {
  private toggleButton: any;
  private sidebarVisible: boolean;
  registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  }); 
  confirm_password:string;
  fecha:string =  new Date().toISOString().split('T')[0];
  register:Register={
    id:0,
    first_name:"",
    last_name:"",
    charge:"",
    telephone:"",
    email:"",
    company:"",
    industry:"",
    created_at:this.fecha,
  }
  constructor(public modal: NgbModal, public el: ElementRef, private renderer: Renderer2, public location: Location, 
    public auth:AuthenticationService, public regSvc:RegistroService) {
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
async onRegister(){
    var element = <HTMLInputElement> document.getElementById("privacy");
        var isChecked = element.checked;
        const {email,password} = this.registerForm.value;
        delete this.register.id;
        this.register.first_name = (<HTMLInputElement>document.getElementById("nombre")).value;
        this.register.last_name = (<HTMLInputElement>document.getElementById("apellido")).value;
        this.register.email = (<HTMLInputElement>document.getElementById("email")).value;
        this.register.telephone = (<HTMLInputElement>document.getElementById("telefono")).value;
        this.confirm_password = (<HTMLInputElement>document.getElementById("confirm_password")).value;

        if(!(email.length===0) && !(password.length===0) && !(this.register.first_name.length===0) 
        && !(this.register.last_name.length===0) && !(this.register.telephone.length===0)){
            
            if(this.confirm_password===password){
                
                if(isChecked){
                    console.log("form ",this.registerForm.value);
                    const user = await this.auth.register(email,password);
                    if(user){
                        this.regSvc.createUser(this.register).subscribe(
                            res=>{
                              console.log("se mandó a crear");
                              console.log(this.register);
                              console.log(res);
              
                              Swal.fire({
                                icon: 'success',
                                title: 'Completado!...',
                                text: 'Usuario registrado'
                              })
              
                            },err=>Swal.fire({
                              icon: 'error',
                              title: 'Oops...',
                              text: 'Fallo en la base de datos'
                            })
                          )
                    }
                }else{
                    Swal.fire({
                        icon: 'warning',
                        title: 'Atención',
                        text: 'Favor de aceptar el aviso de privacidad'
                    })
                }
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Atención',
                    text: 'Las contraseñas no son iguales'
                })
            }

            
         }else{
            Swal.fire({
                icon: 'error',
                title: 'Atención',
                text: 'Favor de llenar todos los campos '
            })
         }
 };

}
