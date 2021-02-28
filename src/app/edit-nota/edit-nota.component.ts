import { DatePipe } from '@angular/common';
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
  dataSelecionada:Date;

  constructor(
    private route: ActivatedRoute,
    private bigfService: BigfServiceService,
    private router: Router,
    private datePipe:DatePipe
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.uidNota = params['uid'];
      if (this.uidNota === 'novo') {
        this.notaCorretagem = this.criarNotaVazia();
        this.dataSelecionada = new Date();
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
      dataMovimentacao: ""
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
    this.bigfService.getObject(BigfServiceService.NOTAS_CORRETAGEM, uidNota).subscribe(res => {
      this.notaCorretagem = res;
      this.dataSelecionada = new Date(this.notaCorretagem.dataMovimentacao);
    });
  }


  calcularDados(somarTransacoes = true, det:NotaCorretagemDetalhe = null) {
    this.gerarArrayTransacoes();
    if(det!=null){
      det.valorUnitario = det.valorTotal / det.quantidade;
    }

    if (somarTransacoes) {
      let compras = 0;
      let vendas = 0;

      this.notaCorretagem.transacoes.forEach(item => {
        if (item.couv === "C") compras += item.valorTotal;
        if (item.couv === "V") vendas += item.valorTotal;
      })
      this.notaCorretagem.totalCompra = compras;
      this.notaCorretagem.totalVenda = vendas;
    }
    this.notaCorretagem.liquidoOper = this.notaCorretagem.totalVenda - this.notaCorretagem.totalCompra;
    let liquidoTemp = Math.abs(this.notaCorretagem.liquidoFinal);
    if(this.notaCorretagem.coud == "D") liquidoTemp = -liquidoTemp;
        this.notaCorretagem.totalTaxas = this.notaCorretagem.liquidoOper - liquidoTemp;

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
      this.notaCorretagem.dataMovimentacao = this.datePipe.transform(this.dataSelecionada, "yyyy-MM-dd");
      this.bigfService.insert(BigfServiceService.NOTAS_CORRETAGEM, this.notaCorretagem);
    }
    else {
      this.notaCorretagem.dataMovimentacao = this.datePipe.transform(this.dataSelecionada, "yyyy-MM-dd");
      this.bigfService.update(BigfServiceService.NOTAS_CORRETAGEM, this.notaCorretagem);
    }
    this.router.navigate(["/notas"]);
  }

  cancelar() {
    this.router.navigate(["/notas"]);
  }


}
