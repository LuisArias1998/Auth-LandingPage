import { Component, OnInit, HostListener, ElementRef, Renderer2 } from '@angular/core';
import { Location} from '@angular/common';
@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.scss']
})
export class PagosComponent implements OnInit {
  date : Date = new Date();
  private toggleButton: any;
  private sidebarVisible: boolean;

  constructor(public el: ElementRef, private renderer: Renderer2, public location: Location) { 
    this.sidebarVisible = false;
  }
  @HostListener('window:scroll', ['$event'])

  ngOnInit(): void {
        var navbar = document.getElementById("navegacion")
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

}
