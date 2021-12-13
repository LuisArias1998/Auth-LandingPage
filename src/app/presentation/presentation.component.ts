import { Component, OnInit, OnDestroy, HostListener, ElementRef, Renderer2 } from '@angular/core';
import { BlogsService } from '../services/blogs.service';
import { Blogs } from '../models/Blogs';
import { SpecificBlogComponent } from '../components/specific-blog/specific-blog.component';
import { SpecificBlogService } from '../services/specific-blog.service';



@Component({
    selector: 'app-presentation',
    templateUrl: './presentation.component.html',
    styleUrls: ['./presentation.component.scss']
})

export class PresentationComponent implements OnInit, OnDestroy {
    blogs:any=[];
    blog:any;
    model = {
        left: true,
        middle: false,
        right: false
    };
    date : Date = new Date();
    specBlog:SpecificBlogComponent;
 
    
     constructor(public el: ElementRef, private renderer: Renderer2, private blogsService:BlogsService, private spBlog: SpecificBlogService) {
         
      }
     @HostListener('window:scroll', ['$event'])
     checkScroll() {
        const componentPosition = document.getElementsByClassName('add-animation');
        const scrollPosition = window.pageYOffset;
        
        for(var i = 0; i < componentPosition.length; i++) {
            var rec = componentPosition[i].getBoundingClientRect().top + window.scrollY + 100;
            if ( scrollPosition + window.innerHeight >= rec ) {
                componentPosition[i].classList.add('animated');
            } else if ( scrollPosition + window.innerHeight * 0.8 < rec ) {
                componentPosition[i].classList.remove('animated');
            }
        }
     }
    ngOnInit() {

        this.blogsService.getBlogs().subscribe(
            res=>{
                this.blogs=res[0];
                console.log(this.blogs);
            },
            err=>console.log(err)
        );

        var body = document.getElementsByTagName('body')[0];
        body.classList.add('presentation-page');
        body.classList.add('loading');
        var navbar = document.getElementById("navsita");
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
        
        
    }
    ngOnDestroy(){
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('presentation-page');
        body.classList.remove('loading');
        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.remove('navbar-transparent');
    }
    setBlog(bl:any){
        this.spBlog.setBlog(bl);
    }
}
