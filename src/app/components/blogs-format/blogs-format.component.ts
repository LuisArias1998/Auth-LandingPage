import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { StorageService } from '../../services/storage.service';
import { BlogsService } from '../../services/blogs.service';
import { Blogs } from '../../models/Blogs';

@Component({
  selector: 'app-blogs-format',
  templateUrl: './blogs-format.component.html',
  styleUrls: ['./blogs-format.component.scss']
})
export class BlogsFormatComponent implements OnInit {
  
  public archivos:any;
  public reader:FileReader;
  public titulo:string;
  public descripcion:string;
  public autor:string;
   fecha:string =  new Date().toISOString().split('T')[0];


  blog:Blogs={
    id:0,
    title:"",
    description:"",
    image:"",
    created_at:this.fecha,
    autor:""
  };

  constructor(private storageService:StorageService, private blogsService:BlogsService) {
   }

  ngOnInit(): void {
    let archivos:any;
    console.log(this.fecha);
  }

  imagenes:any[]=[];
  onUpload(e:any){
    this.archivos = e.target.files;
    this.reader = new FileReader();    
  }

  uploadedImage(){
    delete this.blog.id;
    this.titulo = (<HTMLInputElement>document.getElementById("titulo")).value;
    this.descripcion = (<HTMLInputElement>document.getElementById("descripcion")).value;
    this.autor = (<HTMLInputElement>document.getElementById("autor")).value;
    if(!(this.titulo.length===0)){
      if(!(this.descripcion.length===0)){
        if(!(this.autor.length===0)){
          this.reader.readAsDataURL(this.archivos[0]);
          this.reader.onloadend=()=>{
          this.imagenes[0]=this.reader.result
          this.storageService.subirImagen(this.titulo +"_"+Date.now(),this.reader.result).then(urlImagen=>{
            this.blog.image=urlImagen;
            this.blog.autor=this.autor;
            this.blog.title=this.titulo;
            this.blog.description=this.descripcion;

            this.blogsService.createBlogs(this.blog).subscribe(
              res=>{
                console.log("se mandó a crear");
                console.log(this.blog);
                console.log(res);
              },err=>console.log(err)
            )

            console.log(urlImagen);
          });
          

  
          }
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El autor está vacío'
          })
        }
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'La descripción está vacía'
        })

      }
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El título está vacío'
      })
    }
  }
}
