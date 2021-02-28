import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotaCorretagem } from '../model/NotaCorretagem';
import { NotaCorretagemDetalhe } from '../model/NotaCorretagemDetalhe';
import { BigfServiceService } from '../services/bigf-service.service';

@Component({
  selector: 'app-edit-nota',
  templateUrl: './edit-nota.component.html',
  styleUrls: ['./edit-nota.component.css']
})
export class EditNotaComponent implements OnInit {

  uidNota: string;
  notaCorretagem: NotaCorretagem;
  quantidadeOperacoes: number;

  constructor(
    private route: ActivatedRoute,
    private bigfService: BigfServiceService,
    private router:Router
  ) { }

  ngOnInit(): void {



    this.route.params.subscribe(params => {
      this.uidNota = params['uid'];
      if (this.uidNota === 'novo') {
        this.notaCorretagem = this.criarNotaVazia();
      }
      else {
        this.notaCorretagem = this.criarNotaVazia();
        this.carregarNota(this.uidNota);
      }
    });
  }

  criarNotaVazia(): NotaCorretagem {
    let ret: NotaCorretagem = {
      coud: "",
      liquidoFinal: null,
      liquidoOper: 0,
      nomeCorretora: '',
      totalCompra: 0,
      totalTaxas: 0,
      totalVenda: 0,
      transacoes: [],
      data:new Date()
    };
    return ret;
  }
  criarTrasacaoVazia(): NotaCorretagemDetalhe {
    let ret: NotaCorretagemDetalhe = {
      couv: null,
      quantidade: null,
      ticker: null,
      valorTotal: null,
      valorUnitario: null
    }
    return ret;
  }

  carregarNota(uidNota: string) {
    debugger;
    this.bigfService.getObject(BigfServiceService.NOTAS_CORRETAGEM, uidNota).subscribe(res=>{
      this.notaCorretagem = res;
    });
  }


  calcularDados() {
    this.gerarArrayTransacoes();
  }

  removerLcto(key) {
    this.notaCorretagem.transacoes.splice(key, 1);
    this.quantidadeOperacoes = this.notaCorretagem.transacoes.length;
  }

  gerarArrayTransacoes() {
    while (this.notaCorretagem.transacoes.length < this.quantidadeOperacoes) {
      this.notaCorretagem.transacoes.push(this.criarTrasacaoVazia());
    }

    while (this.notaCorretagem.transacoes.length > this.quantidadeOperacoes) {
      this.notaCorretagem.transacoes.pop();
    }

  }

  salvarNota() {
    if (this.uidNota === 'novo') {
      this.bigfService.insert(BigfServiceService.NOTAS_CORRETAGEM, this.notaCorretagem);
    }
    else {
      this.bigfService.update(BigfServiceService.NOTAS_CORRETAGEM, this.notaCorretagem);
    }
    this.router.navigate(["/notas"]);
  }

  cancelar() {
    this.router.navigate(["/notas"]);
  }


}
