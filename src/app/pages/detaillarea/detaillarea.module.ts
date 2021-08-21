import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetaillareaPageRoutingModule } from './detaillarea-routing.module';

import { DetaillareaPage } from './detaillarea.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { ModalPage } from 'src/app/components/modal/modal.page';
import { ModalPageModule } from 'src/app/components/modal/modal.module';

@NgModule({
  entryComponents: [
    ModalPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetaillareaPageRoutingModule,
    ComponentsModule,
    ModalPageModule
  ],
  declarations: [DetaillareaPage]
})
export class DetaillareaPageModule {}
