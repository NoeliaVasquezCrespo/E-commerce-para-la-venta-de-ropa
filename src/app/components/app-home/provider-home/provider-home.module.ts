import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProviderHomeRoutingModule } from './provider-home-routing.module';
import { ProviderHomeComponent } from './provider-home.component';
import { SharedModule } from '../../../shared/shared.module';
import { NgParticlesModule } from 'ng-particles';

@NgModule({
  declarations: [ProviderHomeComponent],
  imports: [CommonModule, ProviderHomeRoutingModule, SharedModule, NgParticlesModule]
})
export class ProviderHomeModule {}
