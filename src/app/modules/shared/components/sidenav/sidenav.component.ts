import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  mobileQuery: MediaQueryList;
  username: any;
  menuNav = [
    { name: "Home", route: "home", icon: "home" },
    { name: "Categorías", route: "category", icon: "category" },
    { name: "Productos", route: "product", icon: "production_quantity_limits" }
  ];

  constructor(
    media: MediaMatcher,
    public router: Router,

  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
  }

  ngOnInit(): void {
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('login');

  }

}
