import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private loginService: LoginService, private router:Router) { }

  items: MenuItem[];


  ngOnInit(): void {
    this.items = [
      { label: 'Home' , routerLink:['']},
      { label: 'Tickers' , routerLink:['/tickers']},
      { label: 'Patrimonio Inicial', routerLink:['/patrimonioInicial'] },
      { label: 'Notas de Corretagens', routerLink:['/notas'] },

      { label: 'Rendimentos ', routerLink:['/rendimentos'] },
      { label: 'Bens e Direitos', routerLink:['/bensDireitos'] },
      { label: 'Operacoes Comuns', routerLink:['/operacoesComuns'] },
      { label: 'Operacoes FII', routerLink:['/operacoesFii'] }
    ];
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

}
