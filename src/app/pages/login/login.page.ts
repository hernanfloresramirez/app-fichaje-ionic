import { SocketsService } from './../../services/sockets.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { Login } from '../../interfaces/login';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formGroups: FormGroup;
  constructor(
    private router: Router,
    private authService: AuthService,
    private toastController: ToastController,
    private socketsService: SocketsService) {
    this.buildForm();
  }
  ngOnInit() { }
  private buildForm() {
    this.formGroups = new FormGroup({
      "cod_pers": new FormControl('', [
        Validators.required,
        Validators.maxLength(19),
        Validators.minLength(2)]),
      "nro_id": new FormControl('', [
        Validators.required,
        Validators.maxLength(12),
        Validators.minLength(5)]),
    });
    this.formGroups.valueChanges
      .pipe(
        debounceTime(600)
      )
      .subscribe(value => {
        ///////console.log(value);
      });
  }
  login() {
    if (navigator.onLine) { // el navegador está conectado a la red console.log("Usted tiene acceso a internet");
      console.log(this.formGroups.value);
      this.authService
        .login(this.formGroups.value)
        .subscribe(
          (res: any) => { //console.log(res); console.log("a",res.data); console.log("b",res.state); console.log("c",res.token);
            if (res.state == 1) {
              this.authService.setUser(res.data);
              this.authService.setToken(res.token);
              //console.time();
              this.listensocket("pacientconnected");
              //console.timeEnd();
              this.router.navigate(['/home']);
            } else {
              this.presentToast("top", "danger", "Los datos introducidos no son correctos");
            }
          },
          err => console.log('EL ERROR ES: ', err)
        );
    } else {
      // el navegador NO está conectado a la red
      this.presentToast("bottom", "secondary", "Error de conexion, revise su conexion a internet por favor");
    }
  }
  async presentToast(val: any, color: any, txt: any) {
    const toast = await this.toastController.create({
      header: '¡ERROR!',
      duration: 2000,
      message: txt,
      position: val,
      color: color,
      cssClass: "toast-scheme ",
    });
    toast.present();
  }
  async listensocket(nameSocket: string) {
    return await this.socketsService
      .listen(nameSocket)
      .subscribe(
        (res: any) => {
          console.log("RESP Socket.io : ", res);
        }, (err) => {
          console.log("err : ", err);
        }
      );
  }
  async emitsocket(nameSocket: string, data: any) {
    return await this.socketsService
      .emit(nameSocket, data);
    /*.subscribe(
      (res: any) => {
        console.log(nameSocket, data);
      }, (err) => {
        console.log(err);
      }
    )*/
  }
}