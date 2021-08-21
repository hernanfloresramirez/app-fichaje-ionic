import { SocketsService } from './../../services/sockets.service';
import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Ficha } from '../../interfaces/ficha';
import { EstadisposicionfichaService } from 'src/app/services/estadisposicionficha.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  @Input() arraysFichsDisps;
  @Input() totdisp;

  @Input() no;
  @Input() nombmed;
  @Input() codesp;
  @Input() codserv;
  @Input() codcon;
  @Input() periodo;
  @Input() codpac;
  @Input() nombpac;
  @Input() codtit;
  @Input() fechahora;
  @Input() tipo;
  @Input() area;

  constructor(
    private modalController: ModalController,
    private estadisposicionfichaService: EstadisposicionfichaService,
    private router: Router,
    private socketsService: SocketsService) { }
  ngOnInit() {
  }
  confirm() {
    let fechact = new Date();
    let fechprs = new Date(this.fechahora);
    fechact.setDate(fechact.getDate() + 1);
    let datsficharegister: Ficha = {
      "codmed": this.nombmed.Usuario.cod_med,
      "codesp": this.nombmed.Medesp.cod_esp,
      "codserv": this.nombmed.Usuario.cod_serv,
      "codcon": this.codcon,
      "codtit": this.nombpac.cod_pers,
      "codpac": this.nombpac.cod_pers,
      "nroficha": this.no,
      "fechasoli": fechact,
      "horasoli": fechact,
      "horapres": fechprs,
      "horaaten": fechact,
      "estado": 'E',
      "codusu": 9999,
      "estcons": '',
      dia: (fechact.getDay() + 1),
      periodo: this.nombmed.turno
    };
    this.estadisposicionfichaService
      .registrar(datsficharegister)
      .subscribe(resp => {
        if (resp.state) {
          this.arraysFichsDisps.estado = false;
          this.modalController.dismiss();
          //REFRESCAR CON SOCKET.IO EN EL FUTURO
          this.listensocket('bloqueardisposicion');

          this.emitsocket("Totalclients", { 'otro': 'ssss' });
          this.listensocket("Totalclients");

        } else {
          alert('Error desconocido!!!');
          this.modalController.dismiss();
        }
      }, errs => { console.log(errs); })
  }
  salir() {
    this.modalController.dismiss();
  }
  async listensocket(nameSocket: string) {
    return await this.socketsService
      .listen(nameSocket)
      .subscribe(
        (res: any) => {
          //this.totdisp = res.socketsconecteds;
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
