import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';

import { ImageUploadModule } from '../shared/image-upload/image-upload.module';

import { HttpClientModule } from '@angular/common/http'


import { ContactoComponent } from './contacto/contacto.component';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { PagosComponent } from './pagos/pagos.component';
import { RouterModule } from '@angular/router';
import { BlogsFormatComponent } from './blogs-format/blogs-format.component';
import { RegistroPagaComponent } from './registro-paga/registro-paga.component';
import { SpecificBlogComponent } from './specific-blog/specific-blog.component';
import { FunctionsPageComponent } from './functions-page/functions-page.component';

import { BlogsService } from '../services/blogs.service';

import { AngularFireModule} from '@angular/fire/compat'
import {provideAuth, getAuth} from '@angular/fire/auth';
import { environment } from '../../environments/environment';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        JwBootstrapSwitchNg2Module,
        ImageUploadModule,
        RouterModule,
        ReactiveFormsModule,
        HttpClientModule,
        provideAuth(() => getAuth()),
        AngularFireModule.initializeApp(environment.firebaseConfig)
    ],
    declarations: [
        ContactoComponent,
        RegistroComponent,
        LoginComponent,
        PagosComponent,
        BlogsFormatComponent,
        RegistroPagaComponent,
        SpecificBlogComponent,
        FunctionsPageComponent,
    ],

    providers:[BlogsService]
})
export class ComponentsModule { }