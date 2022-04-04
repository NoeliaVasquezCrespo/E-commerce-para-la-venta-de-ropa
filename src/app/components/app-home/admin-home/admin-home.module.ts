import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminHomeRoutingModule } from './admin-home-routing.module';
import { AdminHomeComponent } from './admin-home.component';
import { SharedModule } from '../../../shared/shared.module';
import { NgParticlesModule } from 'ng-particles';

@NgModule({
  declarations: [AdminHomeComponent],
  imports: [CommonModule, AdminHomeRoutingModule, SharedModule, NgParticlesModule]
})
export class AdminHomeModule {}
