import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';  // Import your AuthService
import { User as FirebaseUser, onAuthStateChanged } from 'firebase/auth';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [], // Import the components you want to use in the template
})
export class DashboardComponent implements OnInit {
  username: string = '';  // Username to be displayed on the dashboard
  isLoading: boolean = true;

  constructor(
    private auth: Auth,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Handle user authentication state change
    onAuthStateChanged(this.auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        try {
          const userData: any = await this.authService.getCurrentUserData(firebaseUser);
          this.username = userData?.username || '';
        } catch (error) {
          console.error('Failed to fetch user data:', error);
        }
      } else {
        this.username = '';  // Reset if user is logged out
      }
      this.isLoading = false;  // Set loading to false once the data is fetched
    });
  }
}
