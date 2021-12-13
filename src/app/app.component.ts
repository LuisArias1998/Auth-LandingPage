import { Component, OnInit, Renderer2, ElementRef, ViewChild, HostListener } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';

import 'rxjs/add/operator/filter';
import { Location, PopStateEvent } from '@angular/common';
import { NavbarComponent } from './shared/navbar/navbar.component';

var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = 0;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    private yScrollStack: number[] = [];


    constructor( private renderer : Renderer2, private router: Router, private element : ElementRef, public location: Location) {}

    @HostListener('window:scroll', ['$event'])
    hasScrolled() {

        var st = window.pageYOffset;
        // Make sure they scroll more than delta
        if(Math.abs(lastScrollTop - st) <= delta)
            return;

        var navbar = document.getElementsByTagName('nav')[0];

        // If they scrolled down and are past the navbar, add class .nav-up.
        // This is necessary so you never see what is "behind" the navbar.
        if (st > lastScrollTop && st > navbarHeight){
            // Scroll Down
            if (navbar.classList.contains('nav-down')) {
                navbar.classList.remove('nav-down');
                navbar.classList.add('nav-up');
            }
            // $('.navbar.nav-down').removeClass('nav-down').addClass('nav-up');
        } else {
            // Scroll Up
            //  $(window).height()
            if(st + window.innerHeight < document.body.scrollHeight) {
                // $('.navbar.nav-up').removeClass('nav-up').addClass('nav-down');
                if (navbar.classList.contains('nav-up')) {
                    navbar.classList.remove('nav-up');
                    navbar.classList.add('nav-down');
                }
            }
        }

        lastScrollTop = st;
    };
    ngOnInit() {
        var navbar : HTMLElement = this.element.nativeElement.children[0].children[0];
        if (this.location.path() !== '/sections') {
            this.location.subscribe((ev:PopStateEvent) => {

            });
             this.router.events.subscribe((event:any) => {
                if (event instanceof NavigationStart) {

               } else if (event instanceof NavigationEnd) {

                   }
                   else
                       window.scrollTo(0, 0);
               
            });
        }







    }


}
