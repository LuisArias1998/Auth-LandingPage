import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';

import { ComponentsModule } from './components/components.module';

import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';


import { PresentationModule } from './presentation/presentation.module';

import { BlogsService } from './services/blogs.service';
import { RegistroService } from './services/registro.service';
import { UserService } from './services/user.service';

import { AngularFireModule} from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { initializeApp } from 'firebase-admin/app';
import { AngularFirestoreModule }  from '@angular/fire/firestore'
import { AuthenticationService } from './services/authentication.service';



@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserAnimationsModule,
        NgbModule,
        FormsModule,
        RouterModule,
        AppRoutingModule,
        PresentationModule,
        ComponentsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        AngularFireStorageModule,
        AngularFirestoreModule
    ],
    providers: [
        BlogsService,
        RegistroService,
        UserService,
        AuthenticationService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { 



}
