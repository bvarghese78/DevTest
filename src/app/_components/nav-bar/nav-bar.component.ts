import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  items: MenuItem[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Find People By Organization',
        routerLink: '/DevTest'
      },
      {
        label: 'Claims',
        routerLink: '/Claims'
      },
      {
        label: 'Person Details',
        routerLink: '/PersonDetails'
      }
    ]
  }

  loggedIn() {
    return localStorage.getItem('token');
  }

  logOut(): void{
    localStorage.clear();
    this.router.navigateByUrl('/Login');
  }

}
