import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { authState } from 'rxfire/auth';
import { firstValueFrom } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

 constructor(private auth: Auth, private router: Router) {}
  async canActivate (): Promise<boolean>{
    const user = await firstValueFrom(authState(this.auth))
    if (user){
      return true;
    }
    else{
      this.router.navigate(['/login']);
      return false;
    }
  }
  }

