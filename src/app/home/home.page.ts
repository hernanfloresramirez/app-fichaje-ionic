import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Persona } from '../interfaces/persona';
import { AudioService } from '../services/audio.service';
import { MedicosturnoService } from '../services/medicosturno.service';
import { Observable } from 'rxjs';
import { SocketsService } from '../services/sockets.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit {

  public currentUser: any;
  areas: Observable<any[]>;
  nroareas: number;
  @Input() totdisp: number;
  constructor(
    private audio: AudioService,
    private authService: AuthService,
    private medicosturnoService: MedicosturnoService,
    private socketsService: SocketsService) { }
  ngOnInit() {
    this.begin();
  }
  begin() {
    this.authService
      .getCurrentUser()
      .then((data: any) => {
        this.currentUser = data.nombres;
        this.verMedicosTurno(data);
        this.emitsocket("nombClients", this.currentUser);
        this.listensocket("Totalclients");
      })
      .catch((err) => console.log(err));
  }
  ngAfterViewInit() {
    this.audio.preload('tono', 'assets/tonos/sharp-notification.mp3');
    this.play1();
  }
  async play1() { await this.audio.play('tono'); }
  async verMedicosTurno(data: any) {
    await this.medicosturnoService
      .viewnormal(data.Institucion.cod_categ)
      .subscribe(
        (res: any) => {
          if (res.estado == 1) {
            this.areas = res.data;
            this.nroareas = res.totalmedics;
          } else {
            console.log('ERROR!!!');
          }
        },
        err => {
          console.error("El error es : ");
          console.log(err);
        }
      );
  }
  async listensocket(nameSocket: string) {
    return await this.socketsService
      .listen(nameSocket)
      .subscribe(
        (res: any) => {
          this.totdisp = res.socketsconecteds;
          console.log(res.username);
          console.log("RESPONSE : ", res);
        }, (err) => {
          console.log("ERROR : ", err);
        }
      );
  }
  async emitsocket(nameSocket: string, data: any) {
    return await this.socketsService
      .emit(nameSocket, data);
  }
}