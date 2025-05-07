import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { CommonModule } from '@angular/common'; // Import CommonModule for ngIf, ngFor, etc.
@Component({
  selector: 'app-login',
  standalone: true,  // or remove if you're using classic module setup
  imports: [CommonModule,FormsModule],       // add FormsModule if you're using ngModel
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // ✅ Fixed: was `styleUrl`
})
export class LoginComponent {
  email: string = '';
  password: string = '';  // ✅ Fix: you wrote `passwords` earlier
errorMessage: any;
successMessage: any;

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.email, this.password)
      .then(() => {
        alert('Login successful!');
        this.router.navigate(['/dashboard']); // or any route you want
      })
      .catch(err => {
        alert(err.message);
      });
  }
  goToRegister() {
    this.router.navigate(['/register']);
  }
}

