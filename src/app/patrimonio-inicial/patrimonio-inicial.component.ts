import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { PatrimonioLcto } from '../model/PatrimonioLcto';
import { BigfServiceService } from '../services/bigf-service.service';

@Component({
  selector: 'app-patrimonio-inicial',
  templateUrl: './patrimonio-inicial.component.html',
  styleUrls: ['./patrimonio-inicial.component.css']
})
export class PatrimonioInicialComponent implements OnInit {

  novoLcto: PatrimonioLcto;
  patrimonioLctos: PatrimonioLcto[];
  constructor(
    private bigfService: BigfServiceService,
    public afAuth: AngularFireAuth) {
    this.limparNovoLcto();

  }

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.carregarDados();
      }
    });

  }
  insertLcto() {
    if (this.novoLcto.ticker == undefined || this.novoLcto.ticker == "") {
      console.log("Ticker invalido");
    }
    else {
      this.novoLcto.ticker = this.novoLcto.ticker.toUpperCase();
      this.bigfService.insert(BigfServiceService.PATRIMONIO_INICIAL, this.novoLcto).then(res => {
        this.limparNovoLcto();
      });
    }

  }

  limparNovoLcto() {
    this.novoLcto = this.gerarLctoVazio();

  }

  salvarTabela() {
    this.patrimonioLctos.forEach(element => {
      element.ticker = element.ticker.toUpperCase();
    });
    this.bigfService.updateObjsect(BigfServiceService.PATRIMONIO_INICIAL, this.patrimonioLctos);
  }

  restaurarTabela() {
    this.carregarDados();
  }

  removerLcto(key) {
    this.bigfService.delete(BigfServiceService.PATRIMONIO_INICIAL, key);
  }

  carregarDados() {
    this.bigfService.getAll(BigfServiceService.PATRIMONIO_INICIAL).subscribe(res => {
      this.patrimonioLctos = res;
    });
  }

  gerarLctoVazio(): PatrimonioLcto {
    return {
      Corretora: '',
      ticker: '',
    };
  }
  calcPrecoMedio(lcto: PatrimonioLcto) {
    if (lcto.quantidade != undefined && lcto.quantidade != 0) {
      return (lcto.valorTotal ?? 0) / lcto.quantidade
    }
    return 0;
  }

}
