import { Component, OnInit, ElementRef, Renderer2, HostListener, Input } from '@angular/core';
import { Location} from '@angular/common';
import { SpecificBlogService } from '../../services/specific-blog.service';

@Component({
  selector: 'app-specific-blog',
  templateUrl: './specific-blog.component.html',
  styleUrls: ['./specific-blog.component.scss']
})
export class SpecificBlogComponent implements OnInit {
  date : Date = new Date();
  private toggleButton: any;
  private sidebarVisible: boolean;
  SPblogs:any;
  constructor(public el: ElementRef, private renderer: Renderer2, public location: Location, private spBlog: SpecificBlogService) { 
    this.sidebarVisible = false;
  }
  @HostListener('window:scroll', ['$event'])

  ngOnInit(): void {
        
        var navbar = document.getElementById("navegar")
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
  }
  sidebarToggle() {
    // const toggleButton = this.toggleButton;
    // const body = document.getElementsByTagName('body')[0];
    if (this.sidebarVisible === false) {
        this.sidebarOpen();
    } else {
        this.sidebarClose();
    }
    };
    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const html = document.getElementsByTagName('html')[0];
        this.sidebarVisible = true;
        setTimeout(function(){
            toggleButton.classList.add('toggled');
        }, 500);
        html.classList.add('nav-open');
        this.sidebarVisible = true;

    };
    sidebarClose() {
        const html = document.getElementsByTagName('html')[0];
        // console.log(html);
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        html.classList.remove('nav-open');
    };
    ngDoCheck(): void {
        //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
        //Add 'implements DoCheck' to the class.
        this.SPblogs=this.spBlog.blog;
        
    }
}
