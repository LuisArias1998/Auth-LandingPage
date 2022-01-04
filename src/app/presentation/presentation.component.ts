import { Component, OnInit, OnDestroy, HostListener, ElementRef, Renderer2, AfterViewInit, ViewChild} from '@angular/core';
import { BlogsService } from '../services/blogs.service';
import { Blogs } from '../models/Blogs';
import { SpecificBlogComponent } from '../components/specific-blog/specific-blog.component';
import { SpecificBlogService } from '../services/specific-blog.service';



@Component({
    selector: 'app-presentation',
    templateUrl: './presentation.component.html',
    styleUrls: ['./presentation.component.scss']
})

export class PresentationComponent implements OnInit, OnDestroy, AfterViewInit {
   
    @ViewChild("divFunciones") divFun: ElementRef;
    private toggleButton: any;
      private sidebarVisible: boolean;

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
    ngAfterViewInit() {
        
    }
    scrollFun(){
        this.divFun.nativeElement.scrollIntoView({behavior:'smooth'})
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
        var navbar = document.getElementById("naver")
        navbar.classList.add('navbar-transparent');
        this.renderer.listen('window', 'scroll', (event) => {
            const number = window.scrollY;
            if (number > 100 || window.pageYOffset > 100) {
                // add logic
                navbar.classList.remove('navbar-transparent');
            } else {
                // remove logic
                navbar.classList.add('navbar-transparent');
            }    
        });
        const nav: HTMLElement = this.el.nativeElement;
        this.toggleButton = nav.getElementsByClassName('navbar-toggler')[0];
    
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
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        if (this.sidebarVisible === false) {
            this.sidebarVisible = true;
            this.sidebarOpen();
    
        } else {
            this.sidebarClose();
        }
        };
        sidebarOpen() {
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
    
    scrollToFun(){
        var funDiv=document.getElementById("funciones");
        window.scrollTo(0,funDiv.offsetTop);
    }
    scrollToPrecio(){
        var funDiv=document.getElementById("precio");
        window.scrollTo(0,funDiv.offsetTop);
    }
    scrollToBlog(){
        var funDiv=document.getElementById("blog");
        window.scrollTo(0,funDiv.offsetTop);
    }
    scrollToTop(){
        var funDiv=document.getElementById("home");
        window.scrollTo(0,funDiv.offsetTop);
    }

}
