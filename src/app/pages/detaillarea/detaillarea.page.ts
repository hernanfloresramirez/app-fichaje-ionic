import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicosturnoService } from 'src/app/services/medicosturno.service';
import { ModalController } from '@ionic/angular';
import { ModalPage } from 'src/app/components/modal/modal.page';
import { AuthService } from 'src/app/services/auth.service';
import { EstadisposicionfichaService } from 'src/app/services/estadisposicionficha.service';
import { SocketsService } from 'src/app/services/sockets.service';

@Component({
  selector: 'app-detaillarea',
  templateUrl: './detaillarea.page.html',
  styleUrls: ['./detaillarea.page.scss'],
})
export class DetaillareaPage implements OnInit {
  @Input() arraysFichsDisps;
  medicos: any = [];
  tipo: number;
  area: number;
  horarios: any = []; // Array<any[]>;
  getCurrentPacient: any;
  descarea: string;
  constructor(
    private authService: AuthService,
    private medicosturnoService: MedicosturnoService,
    private activatedRoute: ActivatedRoute,
    private modalController: ModalController,
    private estadisposicionfichaService: EstadisposicionfichaService,
    private socketsService: SocketsService) { }
  ngOnInit() {
    this.verMedicosTurno(
      this.activatedRoute.snapshot.paramMap.get('params1'),
      this.activatedRoute.snapshot.paramMap.get('params2')
    );
    this.getUser();
  }
  async getUser() {
    const getCurrentUser = await this.authService.getCurrentUser();
    this.getCurrentPacient = getCurrentUser;
    return this.getCurrentPacient;
  }
  async presentModal(no, nombmed, codcon, periodo, fechahora, area, tipo, itemfichs) {
    const modal = await this.modalController.create({
      component: ModalPage,
      cssClass: 'my-custom-class',
      componentProps: {
        no,
        nombmed,
        periodo,
        codcon,
        fechahora,
        'nombpac': this.getCurrentPacient,
        'institucion': this.getCurrentPacient.Institucion.des_inst,
        area,
        tipo,
        'arraysFichsDisps': itemfichs
      }
    });
    return await modal.present();
  }

  async verMedicosTurno(tipo: any, area: any) { //SOLICITUD DE DETALLES DE FICHAS POR TIPO Y AREA
    this.area = area;
    this.tipo = tipo;
    await this.medicosturnoService
      .viewdetaills(tipo, area)
      .subscribe(
        async (resmain: any) => { //DETALLE DE AREAS DE ATENCIÓN
          this.cuerpo(resmain, tipo, area);
        }, err => {
          console.log(err);
        }
      );
  }
  async cuerpo(resmain: any, tipo: number, area: number,) {
    this.descarea = resmain.data[0].obs;
    console.log("resmain: ", resmain.data);
    this.medicos = [];
    for (let i = 0; i < resmain.data.length; i++) {
      this.medicos[i] = resmain.data[i];
      for (let j = 0; j < resmain.data[i].Horarios.length; j++) {
        let aux = [];
        let hora = new Date(resmain.data[i].Horarios[j].horai);
        let fecha = new Date();
        let horaini = new Date(fecha.getFullYear() + '/' + fecha.getMonth() + '/' + fecha.getDate() + ' ' + hora.getUTCHours() + ':' + hora.getUTCMinutes());
        horaini.setDate(horaini.getDate() + 1);
        for (let k = 0; k < resmain.data[i].Horarios[j].paci_aten; k++) {
          let res = await this.estadisposicionfichaService
            .verificarAll(
              (k + 1),
              resmain.data[i].Usuario.cod_med,
              resmain.data[i].Horarios[j].cod_esp,
              fecha)
            .toPromise();
          aux.push({
            "no": (k + 1),
            "medics": this.medicos[i],
            "codcon": resmain.data[i].Horarios[j].cod_con,
            "estado": res.state,
            "hora": horaini.setMinutes(horaini.getMinutes() + resmain.data[i].Horarios[j].tmpo_aten),
            "periodo": resmain.data[i].Horarios[j].periodo,
            tipo,
            area
          });
        }
        this.listensocket("bloqueardisposicion");
        this.horarios.push({
          horaficha: aux,
          Usuario: this.medicos[i],
        });
      }
    }
    console.log("horarios : ", this.horarios);
  }
  async listensocket(nameSocket: string) {
    this.horarios = [];
    await this.socketsService
      .listen(nameSocket)
      .subscribe(
        (res: any) => {
          console.log("RESPONSE : ", res);
           this.medicosturnoService
          .viewdetaills(this.tipo, this.area)
          .subscribe(
            async (resmain: any) => { //DETALLE DE AREAS DE ATENCIÓN
              console.log('resmain 128: ', resmain);
              this.cuerpo(resmain, this.tipo, this.area);
            }, err => {
              console.log(err);
            }
          );

        }, (err) => {
          console.log("ERROR : ", err);
        }
      );
  }
}