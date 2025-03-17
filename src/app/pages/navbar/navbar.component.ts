import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-navbar',
  imports: [RouterOutlet],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  userName: string | null = null;
  role: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cookieService: CookieService
  ) {
    this.getUserNameFromCookie();

  }

  getUserNameFromCookie() {
    const userData = this.cookieService.get('userData'); // Get cookie value
    if (userData) {
      try {
        const parsedData = JSON.parse(userData); // Parse JSON from cookie
        this.userName = parsedData.name || 'User';
        this.role = parsedData.role || 'User';
      } catch (error) {
        console.error("Error parsing cookie:", error);
        this.userName = 'User';
      }
    } else {
      this.userName = 'User';
    }
  }

  onLogout() {
    this.authService.logout().subscribe({
      next: () => {
        sessionStorage.clear(); // Clear all session data
        window.location.reload();
        this.router.navigateByUrl('/'); // Redirect to login page
      },
      error: (err) => {
        console.error("Logout failed:", err);
      }
    });
  }
}
