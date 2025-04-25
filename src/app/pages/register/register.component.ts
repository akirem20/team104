import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { CommonModule } from '@angular/common'; // Import CommonModule for ngIf, ngFor, etc.
@Component({
  selector: 'app-register',
  standalone: true, // ✅ if you're using standalone components
  imports: [CommonModule,FormsModule],      // ✅ add FormsModule if you're using ngModel
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'] // ✅ Fix: should be 'styleUrls' not 'styleUrl'
})
export class RegisterComponent {
  email: string = '';
  password: string = ''; // ✅ Renamed from 'passwords'
  username: string = ''; // ✅ Needed for registration
successMessage: any;
errorMessage: any;

  constructor(private authservice: AuthService, private router: Router) {}

  // ✅ Register function
  onRegister() {
    console.log('📩 Attempting to register user...');
    this.authservice.register(this.email, this.password, this.username)
      .then((userCredential) => {
        console.log('✅ Registration successful:', userCredential.user.uid);
        alert('Registration successful!');
        this.router.navigate(['/login']);
      })
      .catch(err => {
        console.error('❌ Registration error:', err);
        alert(err.message);
      });
  }
  
}
