import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { AuthResponseDto } from 'src/app/_models/auth-response-dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onLogin(loginForm: NgForm){
    this.authService.authUser(loginForm.value).subscribe(
      (resp: AuthResponseDto) => {
        if(resp){
          localStorage.setItem('token', resp.token);
          localStorage.setItem('userName', resp.userName);
          this.router.navigateByUrl('/DevTest');
        }
      }, error => {
        console.log(error);
      }
    )
  }
}
