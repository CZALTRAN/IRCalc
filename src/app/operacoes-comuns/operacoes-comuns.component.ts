import {Component, OnDestroy, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Subscription} from 'rxjs';
import {VendaOperacao} from '../model/VendaOperacao';
import {OperacoesComunsService} from '../services/operacoes-comuns.service';
import {ConsolidadoMesOperacao} from '../model/ConsolidadoMesOperacao';
import {TipoAtivo} from '../model/Ativo';

@Component({
  selector: 'app-operacoes-comuns-dtrade',
  templateUrl: './operacoes-comuns.component.html',
  styleUrls: ['./operacoes-comuns.component.css']
})
export class OperacoesComunsComponent implements OnInit, OnDestroy {


  subOperComuns: Subscription;
  operComuns: VendaOperacao[];
  consolidadoAcoes: ConsolidadoMesOperacao[];
  consolidadoFii: ConsolidadoMesOperacao[];

  constructor(private afAuth: AngularFireAuth,
              private operacoesService: OperacoesComunsService) {
  }

  ngOnInit(): void {
    this.subOperComuns = this.operacoesService.subVendasOperacaoComum.subscribe({
      next: res => {
        console.log(res);
        this.operComuns = res;
        this.processarOperacoes();
        console.log(this.consolidadoAcoes);
        console.log(this.consolidadoFii);
      }
    });
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.operacoesService.calcularOperacoesComum();
      }
    });
  }

  ngOnDestroy(): void {
    this.subOperComuns.unsubscribe();
  }

  private processarOperacoes(): void {
    this.consolidadoAcoes = [
      {mes: 0, ano: 2020, operacoes: [], tipo: TipoAtivo.TIPO_ACAO, totalLucro: 0, totalVenda: 0},
      {mes: 1, ano: 2020, operacoes: [], tipo: TipoAtivo.TIPO_ACAO, totalLucro: 0, totalVenda: 0},
      {mes: 2, ano: 2020, operacoes: [], tipo: TipoAtivo.TIPO_ACAO, totalLucro: 0, totalVenda: 0},
      {mes: 3, ano: 2020, operacoes: [], tipo: TipoAtivo.TIPO_ACAO, totalLucro: 0, totalVenda: 0},
      {mes: 4, ano: 2020, operacoes: [], tipo: TipoAtivo.TIPO_ACAO, totalLucro: 0, totalVenda: 0},
      {mes: 5, ano: 2020, operacoes: [], tipo: TipoAtivo.TIPO_ACAO, totalLucro: 0, totalVenda: 0},
      {mes: 6, ano: 2020, operacoes: [], tipo: TipoAtivo.TIPO_ACAO, totalLucro: 0, totalVenda: 0},
      {mes: 7, ano: 2020, operacoes: [], tipo: TipoAtivo.TIPO_ACAO, totalLucro: 0, totalVenda: 0},
      {mes: 8, ano: 2020, operacoes: [], tipo: TipoAtivo.TIPO_ACAO, totalLucro: 0, totalVenda: 0},
      {mes: 9, ano: 2020, operacoes: [], tipo: TipoAtivo.TIPO_ACAO, totalLucro: 0, totalVenda: 0},
      {mes: 10, ano: 2020, operacoes: [], tipo: TipoAtivo.TIPO_ACAO, totalLucro: 0, totalVenda: 0},
      {mes: 11, ano: 2020, operacoes: [], tipo: TipoAtivo.TIPO_ACAO, totalLucro: 0, totalVenda: 0}
    ];
    this.consolidadoFii = [
      {mes: 0, ano: 2020, operacoes: [], tipo: TipoAtivo.TIPO_FII, totalLucro: 0, totalVenda: 0},
      {mes: 1, ano: 2020, operacoes: [], tipo: TipoAtivo.TIPO_FII, totalLucro: 0, totalVenda: 0},
      {mes: 2, ano: 2020, operacoes: [], tipo: TipoAtivo.TIPO_FII, totalLucro: 0, totalVenda: 0},
      {mes: 3, ano: 2020, operacoes: [], tipo: TipoAtivo.TIPO_FII, totalLucro: 0, totalVenda: 0},
      {mes: 4, ano: 2020, operacoes: [], tipo: TipoAtivo.TIPO_FII, totalLucro: 0, totalVenda: 0},
      {mes: 5, ano: 2020, operacoes: [], tipo: TipoAtivo.TIPO_FII, totalLucro: 0, totalVenda: 0},
      {mes: 6, ano: 2020, operacoes: [], tipo: TipoAtivo.TIPO_FII, totalLucro: 0, totalVenda: 0},
      {mes: 7, ano: 2020, operacoes: [], tipo: TipoAtivo.TIPO_FII, totalLucro: 0, totalVenda: 0},
      {mes: 8, ano: 2020, operacoes: [], tipo: TipoAtivo.TIPO_FII, totalLucro: 0, totalVenda: 0},
      {mes: 9, ano: 2020, operacoes: [], tipo: TipoAtivo.TIPO_FII, totalLucro: 0, totalVenda: 0},
      {mes: 10, ano: 2020, operacoes: [], tipo: TipoAtivo.TIPO_FII, totalLucro: 0, totalVenda: 0},
      {mes: 11, ano: 2020, operacoes: [], tipo: TipoAtivo.TIPO_FII, totalLucro: 0, totalVenda: 0}
    ];
    this.operComuns.forEach(it => {
      const tempAcoes = this.consolidadoAcoes.find(c => c.mes === it.mes && c.tipo === it.tipo);
      if (tempAcoes) {
        tempAcoes.totalVenda += it.valorVenda;
        tempAcoes.totalLucro += it.lucroVenda;
        tempAcoes.operacoes.push(it);
      }
      const tempFii = this.consolidadoFii.find(c => c.mes === it.mes && c.tipo === it.tipo);
      if (tempFii) {
        tempFii.totalVenda += it.valorVenda;
        tempFii.totalLucro += it.lucroVenda;
        tempFii?.operacoes.push(it);
      }

    });
  }
}
