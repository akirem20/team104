import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Auth } from '@angular/fire/auth';
import { User as FirebaseUser, onAuthStateChanged } from 'firebase/auth';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router'; // <- Import NavigationEnd

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class AppComponent implements OnInit {
  username: string = '';
  isLoading: boolean = true;
  showNavbar: boolean = true; // <-- NEW variable to control the Navbar visibility

  constructor(
    private auth: Auth,
    private authService: AuthService,
    private router: Router
  ) {
    // Listen to route changes to show/hide Navbar
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentUrl = event.urlAfterRedirects;
        this.showNavbar = !(currentUrl.includes('/login') || currentUrl.includes('/register'));
      }
    });
  }

  ngOnInit(): void {
    console.log('AppComponent ngOnInit');
    onAuthStateChanged(this.auth, async (firebaseUser: FirebaseUser | null) => {
      console.log('Auth state changed:', firebaseUser);

      if (firebaseUser) {
        try {
          const userData: any = await this.authService.getCurrentUserData(firebaseUser);
          console.log('Fetched user data:', userData);
          this.username = userData?.username || '';
        } catch (error) {
          console.error('Failed to fetch user data:', error);
        }
      } else {
        this.username = '';
      }
      this.isLoading = false;
      console.log('isLoading:', this.isLoading, 'username:', this.username);
    });
  }

  onLogout() {
    this.authService.logout().then(() => {
      this.username = '';
      this.router.navigate(['/login']);
      console.log('User logged out successfully');
    }).catch((error: any) => {
      console.error('Logout failed:', error);
    });
  }
}
