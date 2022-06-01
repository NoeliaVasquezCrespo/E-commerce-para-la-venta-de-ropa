import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { CartService } from 'src/app/service/cart.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public newAdminForm = new FormGroup({
  
    cantidad: new FormControl('', Validators.required)
    
  });

  public products : any = [];
  constructor(private cartService : CartService, private router: Router) { }
  public cantidad: number;
  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(res=>{
      this.products = res;
      console.log(this.newAdminForm.value.cantidad);
    })
  }
  removeItem(item: any){
    this.cartService.removeCartItem(item);
  }
  emptycart(){
    Swal.fire({
      text: 'Se eliminará todos los items del carrito',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText:'Cancelar',
    }).then(async (result) => {
      if (result.value) {
        console.log('Eliminando ítems del carrito')
        this.cartService.removeAllCart();
        this.confirmDeleteNotification();
      }
    }) 
  }

  confirmDeleteItemNotification(){
    Swal.fire({
      text: 'Se eliminará el item del carrito',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText:'Cancelar',
    }).then(async (result) => {
      if (result.value) {
        console.log('Eliminando ítem del carrito')
        this.removeItem(this.products);
        this.confirmDeleteNotification();
      }
    })   
  }

  confirmDeleteNotification(){
    Swal.fire({
      imageUrl: 'https://cdn3.iconfinder.com/data/icons/shopping-and-ecommerce-29/90/empty_cart-512.png',
      imageWidth: 100,
      imageHeight: 100,
      title: 'Correcto',
      text: 'Ítems eliminados del carrito correctamente',
    })
  }

  confirmListProductsNotification(){
    Swal.fire({
      title: 'Confirmar Productos',
      text: '¿Está seguro de proceder con la compra?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.value) {
        
        console.log('admin dashboard')
        
        await this.router.navigateByUrl('/payment');
      }
    })
  }

  public total() {
  
    let total = 0;
    this.products.forEach((p: { precio: number; }) => total += p.precio);
    return total;
  }

  public totalCantidad(){
    let total = 0;
    this.products.forEach((p: { precio: number; }) => total = p.precio*this.newAdminForm.value.cantidad);
    return total;
  }
}


