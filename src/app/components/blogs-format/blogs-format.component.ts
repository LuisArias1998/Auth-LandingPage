import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { StorageService } from '../../services/storage.service';
import { BlogsService } from '../../services/blogs.service';
import { Blogs } from '../../models/Blogs';
import {AngularFireStorage} from '@angular/fire/storage'
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import {FormGroup, FormControl} from '@angular/forms' 
import { AuthenticationService } from '../../services/authentication.service';
@Component({
  selector: 'app-blogs-format',
  templateUrl: './blogs-format.component.html',
  styleUrls: ['./blogs-format.component.scss'],
  providers:[AuthenticationService]
})
export class BlogsFormatComponent implements OnInit {
  
  public archivos:any;
  public reader:FileReader;
  public titulo:string;
  public descripcion:string;
  public autor:string;
  public path:string;
  public filePath:string;
  public ref;
  public urlImage;
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  }); 

  uploadPercent: Observable<number>;

  fecha:string =  new Date().toISOString().split('T')[0];


  blog:Blogs={
    id:0,
    title:"",
    description:"",
    image:'',
    created_at:this.fecha,
    autor:""
  };

  constructor(private blogsService:BlogsService, public storage: AngularFireStorage,public auth:AuthenticationService ) {
  }

  ngOnInit(): void {
    let archivos:any;
    console.log(this.fecha);
  }

  imagenes:any[]=[];
  onUpload(e:any){
    this.archivos = e.target.files[0];   
  }

  uploadedImage(){
    delete this.blog.id;
    this.titulo = (<HTMLInputElement>document.getElementById("titulo")).value;
    this.descripcion = (<HTMLInputElement>document.getElementById("descripcion")).value;
    this.autor = (<HTMLInputElement>document.getElementById("autor")).value;
    if(!(this.titulo.length===0)){

      if(!(this.descripcion.length===0)){

        if(!(this.autor.length===0)){

            try{

              this.filePath="blogs/"+this.titulo+"_"+Date.now();
              this.ref=this.storage.ref(this.filePath);
              const task = this.storage.upload(this.filePath,this.archivos);
              this.uploadPercent=task.percentageChanges();
              task.snapshotChanges().pipe(
                finalize(() => {
                  this.ref.getDownloadURL().subscribe(url => {
                    console.log(url); 
                    this.blog.image=url;
                    this.blog.autor=this.autor;
                    this.blog.title=this.titulo;
                    this.blog.description=this.descripcion;
                    this.blogsService.createBlogs(this.blog).subscribe(
                    res=>{
                      console.log("se mand?? a crear");
                      console.log(this.blog);
                      console.log(res);
      
                      Swal.fire({
                        icon: 'success',
                        title: 'Completado!...',
                        text: 'Blog creado con ??xito'
                      })
      
                    },err=>Swal.fire({
                      icon: 'error',
                      title: 'Oops...',
                      text: 'Fallo en la base de datos'
                    })
                  )
                  });
                })
              ).subscribe();

            }catch(error){

              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Fallo en firebase'
              })
            }

        }else{

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El autor est?? vac??o'
          })
        }

      }else{

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'La descripci??n est?? vac??a'
        })

      }

    }else{

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El t??tulo est?? vac??o'
      })
    }
    
  }
  onLogin(){
    console.log("form ",this.loginForm.value);
    const{email,password} =this.loginForm.value;
    this.auth.login(email,password);

 };
}
