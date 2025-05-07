import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'; // Update the path to the correct location of AuthService
import { Auth } from '@angular/fire/auth';
import { User } from 'firebase/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule if you need to use forms in your template

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css'],
  imports: [CommonModule, FormsModule], // Include CommonModule and FormsModule if needed
})
export class ProfilesComponent implements OnInit {
  user: User | null = null; // Store the current user
  userProfile: any; // Store the user data from Firestore (including displayName)

  constructor(private auth: Auth, private authService: AuthService) {}

  ngOnInit(): void {
    this.auth.onAuthStateChanged(async (user) => {
      this.user = user;
      if (user) {
        // Fetch user data from Firestore
        const userData = await this.authService.getCurrentUserData(user);
        this.userProfile = userData;
        console.log('User profile fetched:', userData);
      }
    });
  }
}
