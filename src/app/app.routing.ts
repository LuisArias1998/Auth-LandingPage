import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';


import { ContactoComponent } from './components/contacto/contacto.component';
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';
import { PagosComponent } from './components/pagos/pagos.component';
import { BlogsFormatComponent } from './components/blogs-format/blogs-format.component';
import { RegistroPagaComponent } from './components/registro-paga/registro-paga.component';
import { SpecificBlogComponent } from './components/specific-blog/specific-blog.component';
import { FunctionsPageComponent } from './components/functions-page/functions-page.component';
import { PresentationComponent } from './presentation/presentation.component';



const routes: Routes =[
    { path: 'presentation',         component: PresentationComponent },
    { path: 'contactus',            component: ContactoComponent },
    { path: 'zitheonsoft/blogs/fill',component: BlogsFormatComponent },
    { path: 'login',                component: LoginComponent },
    { path: 'functionsPage',        component: FunctionsPageComponent },
    { path: 'pago',                 component: PagosComponent },
    { path: 'registro',             component: RegistroComponent },
    { path: 'specific/blog',        component: SpecificBlogComponent },
    { path: 'pago/registroPago',    component: RegistroPagaComponent },

    { path: '', redirectTo: 'presentation', pathMatch: 'full' }
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes,{
          useHash: true
        })
    ],
    exports: [
    ],
})
export class AppRoutingModule { }
