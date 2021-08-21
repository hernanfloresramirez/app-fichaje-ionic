import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComollegarPageRoutingModule } from './comollegar-routing.module';

import { ComollegarPage } from './comollegar.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComollegarPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ComollegarPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComollegarPageModule {}
