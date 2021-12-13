import { Injectable } from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage'
import { environment } from '../../environments/environment';






@Injectable({
  providedIn: 'root'
})
export class StorageService {



  constructor(public af: AngularFireStorage) { }

  async subirImagen(nombre:string,archivos:any){
    this.af.upload(nombre,archivos)
  }
}
