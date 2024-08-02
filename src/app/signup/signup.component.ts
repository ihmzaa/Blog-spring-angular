import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  username: string = '';
  password: string = '';
  email: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  signup() {
    this.authService.signup(this.username, this.password, this.email).subscribe(
      response => {
        this.router.navigate(['/blogs']);
      },
      (error: HttpErrorResponse) => { 
        this.errorMessage = 'Signup failed. Please try again.';
        console.error('Signup error:', error);
      }
    );
  }
}
