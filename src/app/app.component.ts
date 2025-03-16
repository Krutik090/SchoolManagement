import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { LoginLayoutComponent } from './login-layout/login-layout.component';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginComponent, LoginLayoutComponent, NavbarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'SchoolManagement';
  currentRole: string = 'guest'; // Default role

  constructor(private authService: AuthService) {
  }
  ngOnInit(): void {
    this.updateLayout(); // Set layout on page load
    console.log(this.currentRole);
  }
  /**
   * Update Layout Based on User Role
   */
  private updateLayout(): void {
    this.authService.getRole().subscribe(response => {
      if (response.role === 'admin') {
        this.currentRole = 'admin';
      } else if (response.role === 'teacher') {
        this.currentRole = 'teacher';
      } else if (response.role === 'student') {
        this.currentRole = 'student';
      } else {
        this.currentRole = 'guest';
      }
    });
  }

}
