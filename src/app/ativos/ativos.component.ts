import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Ativo } from '../model/Ativo';
import { BigfServiceService } from '../services/bigf-service.service';

@Component({
  selector: 'app-ativos',
  templateUrl: './ativos.component.html',
  styleUrls: ['./ativos.component.css']
})
export class AtivosComponent implements OnInit {


  ativos: Ativo[];
  novoAtivo: Ativo;

  constructor(private bigfService: BigfServiceService, public afAuth: AngularFireAuth) {
    this.limparNovoTicker();
  }

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.carregarDados();
      }
    });
  }

  insertTicker() {
    if (this.novoAtivo.ticker == undefined || this.novoAtivo.ticker == "") {
      console.log("Ticker invalido");
    }
    else {
      this.novoAtivo.key = this.novoAtivo.ticker;
      this.bigfService.updateSet(BigfServiceService.ATIVOS, this.novoAtivo).then(res => {
        this.limparNovoTicker();
      });
    }
  }

  limparNovoTicker() {
    this.novoAtivo = this.gerarAtivoVazio();
  }

  salvarTabela() {
    this.ativos.forEach(el => {
      el.key = el.ticker;
    });

    this.bigfService.updateObjsect(BigfServiceService.ATIVOS, this.ativos);
  }
  restaurarTabela() {
    this.carregarDados();
  }

  carregarDados() {
    this.bigfService.getAll(BigfServiceService.ATIVOS).subscribe(res => {
      this.ativos = res;
    });
  }

  removerAtivo(key) {
    this.bigfService.delete(BigfServiceService.ATIVOS, key);
  }

  gerarAtivoVazio(): Ativo {
    return {
      ticker: '',
      nome: '',
      cnpj: '',
      razaoSocial: '',
    };
  }

}
