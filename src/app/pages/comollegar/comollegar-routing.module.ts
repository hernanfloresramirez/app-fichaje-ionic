import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComollegarPage } from './comollegar.page';

const routes: Routes = [
  {
    path: '',
    component: ComollegarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComollegarPageRoutingModule {}
