import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { menuList as staticMenuList } from '../../data/menus';
import { CartService } from 'src/app/service/cart.service';
@Component({
  selector: 'll-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() topFixed: boolean;
  @Output() toggleSidenav = new EventEmitter();
  isScrolled: boolean;
  menuList = [] as any;
  opened: boolean;
  isLessThenLargeDevice: boolean;
  constructor(private breakpointObserver: BreakpointObserver, private cartService : CartService) {}
  public products = [];
  public totalItem : number = 0;
  ngOnInit(): void {
    this.menuList = staticMenuList;
    this.breakpointObserver.observe(['(max-width: 1199px)']).subscribe(({ matches }) => {
      this.isLessThenLargeDevice = matches;
    });
    this.cartService.getProducts()
    .subscribe(res=>{
      this.totalItem = res.length;
      this.products = res;
    })
  }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    this.isScrolled = window.pageYOffset > 15;
  }

  public total() {
  let total = 0;
    let p;
    this.products.forEach((p: { precio: number; }) => total += p.precio);
    return total;
  }

  

}
