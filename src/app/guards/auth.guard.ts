import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private authService: AuthService, 
    private router: Router) {}
  canActivate() {
    return this.authService
      .getCurrentUser()
      .then((data: any) => {
        if(data===null) {
          this.router.navigate(['/login']);
          return false;
        } else {  
          return true;
        }
      })
      .catch((err) => {
        console.log(err);
        this.router.navigate(['/login']);
        return false
      });
  }
}
