import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() titulo : string;
  public isLogged: boolean = false;

  constructor(
    private menuController: MenuController,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.onCheckUser();
  }

  toggleMenu() {
    this.menuController.toggle();
  }

  onLogout() {
    console.log("cerrando la session");
    this.authService.logoutUser()
      .then(res => {
        this.router.navigate(['/login']);
      });
  }

  onCheckUser(): void {
    if(this.authService.getCurrentUser() === null) {
      this.isLogged = false;
    } else {
      this.isLogged = true;
    }
  }
}