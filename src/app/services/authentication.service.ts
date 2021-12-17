import { Injectable } from '@angular/core';
import {auth} from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import {User} from 'firebase';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public user:User;
  private ban:boolean=true;
  constructor(public afAuth:AngularFireAuth) { }
  async login(email:string, password:string){
    try{
      const result = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
    
      this.ban=true;
      console.log("hola");
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
