import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  items: MenuItem[];


  ngOnInit(): void {
    this.items = [
      { label: 'Home' , routerLink:['']},
      { label: 'Tickers' , routerLink:['/tickers']},
      { label: 'Patrimonio Inicial', routerLink:['/patrimonioInicial'] },
      { label: 'Notas de Corretagens', routerLink:['/notas'] }
    ];
  }

  logout() {
    this.loginService.logout();
  }

}
