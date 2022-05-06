import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SharedModule } from './shared/shared.module';
import { NgxStripeModule } from 'ngx-stripe';
import { MatExpansionModule} from '@angular/material/expansion';
import { CartComponent } from './components/cart/cart.component';
import { PaymentComponent } from './components/payment/payment.component';
@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    PaymentComponent

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxStripeModule.forRoot('pk_test_51HsQItDzrd3IWIh0zmPzMaluNoodUjs1x8BXn7xqnXhBTaWpg7D7LRfPNQZDpU2PpLYiQZ5fn3P4maBatUGYIORL00uooPsRD1'),
    BrowserAnimationsModule,  SharedModule, NgxSkeletonLoaderModule,MatInputModule, MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
