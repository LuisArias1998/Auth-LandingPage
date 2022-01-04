import { Injectable } from '@angular/core';
import {auth} from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';

import Swal from 'sweetalert2';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { Register } from '../models/register';
import { switchMap } from 'rxjs/operators';
import { JwtAuthService } from './jwt-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
 
  private ban:boolean=true;
  public user$:Observable<Register>;
  userData:any;

  constructor(public afAuth:AngularFireAuth, public afs: AngularFirestore, private _jwt: JwtAuthService) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.user$=this.afAuth.authState.pipe(
      switchMap(user=>{
        if(user){
          return this.afs.doc<Register>(`users/${user.uid}`).valueChanges(); //user
        }
        return of(null);
      })
    )

   }
  async login(email:string, password:string){
    try{
      const result = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      result.user.getIdToken(/* forceRefresh */ true).then((idToken) => {
        this._jwt.login(idToken);
        
      }).catch(function(error) {
        // Handle error
      });
      result.user.getIdToken
      this.ban=true;
      return result;
    }catch(error){    
      this.ban=false;
      console.log(error);
    }
  }
  async register(email:string, password:string){
    try{
      const result = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      this.sendVerificationEmail();
      
      return result;
    }catch(error){
      Swal.fire({
        icon: 'error',
        title: 'Atención',
        text: error.code
      })
      console.log(error.code);
    }
  }
  async sendVerificationEmail():Promise<void>{
    return (await this.afAuth.currentUser).sendEmailVerification();
  }
  getBan(){
    return this.ban;
  }

}
