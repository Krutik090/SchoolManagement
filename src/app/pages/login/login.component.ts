import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import Reactive Forms
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;  // Declare the form group

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {
    // Initialize the form group with form controls and validators
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],  // Email field with required and email validation
      password: ['', [Validators.required]]  // Password field with required validation
    });

    this.checkLoggedIn();

  }

  // Helper Function to Get Cookie by Name
  getCookie(name: string) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const [key, value] = cookie.trim().split('=');
      if (key === name) {
        return value; // Return cookie value
      }
    }
    return null; // Return null if cookie not found
  }

  // Check if User is Already Logged In
  checkLoggedIn() {
    const userData = this.getCookie('userData'); // Fetch userData from cookies

    if (userData) {
      this.router.navigate(['/dashboard']);
    }
  }

  // Method to handle the login on form submit
  onLogin() {
    if (this.loginForm.invalid) {
      return; // If the form is invalid, prevent submission
    }

    const user = this.loginForm.value; // Get form values (email, password)

    this.authService.login(user).subscribe(
      (res) => {
        if (res) {
          this.router.navigate(['/dashboard']);
        } else {
          alert('Invalid Credentials');
        }
      },
      (error) => {
        alert('Login failed!!');
        console.log(error);
      }
    );
  }
}
