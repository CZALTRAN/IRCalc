import { Injectable } from '@angular/core';
import { forkJoin, Subject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Ativo, TipoAtivo } from '../model/Ativo';
import { BemAndDireito, TipoNoIR } from '../model/BemAndDireito';
import { NotaCorretagem } from '../model/NotaCorretagem';
import { PatrimonioLcto } from '../model/PatrimonioLcto';
import { BigfServiceService } from './bigf-service.service';

@Injectable({
  providedIn: 'root'
})
export class BensDireitosService {

  constructor(private bigfService: BigfServiceService) {
    this.subBensDireitos = new Subject<BemAndDireito[]>()
  }

  ativos: Ativo[];
  notas: NotaCorretagem[];
  patrimonioLctos: PatrimonioLcto[];

  private bensAndDiretos: BemAndDireito[];

  subBensDireitos: Subject<BemAndDireito[]>;

  calcularBensDireitos() {
    this.bensAndDiretos = [];
    forkJoin([this.carregarAtivos(), this.carregarNotas(), this.carregarPatrimonioInicial()]).
      subscribe(
        res => {
          this.processarPatrimonioInicial();
          this.processarNotas();
          this.subBensDireitos.next(this.bensAndDiretos);
        });
  }

  processarNotas() {
    this.notas.forEach(el => {
      this.processarNota(el);
    });
  }

  processarNota(el: NotaCorretagem) {
    let totalOperacoes = el.totalCompra + el.totalVenda;

    el.transacoes.forEach(tr => {
      let dadosTicker = this.findTicker(tr.ticker);
      let bensDir = this.findBemAndDireito(el.nomeCorretora, tr.ticker);
      if (bensDir == undefined) {
        bensDir = {
          corretora: el.nomeCorretora,
          ticker: tr.ticker,
          quantidadeInicial: 0,
          valorTotalInicial: 0,
          quantidadeFinal: 0,
          valorTotalFinal: 0,
          nomeEmpresa: dadosTicker?.nome ?? "Cadastre o Ticker",
          CNPJ: dadosTicker?.cnpj ?? "00.000.000/0000-00",
          tipoNoIr: this.convertTipoTickerTipoIR(dadosTicker?.tipoAtivo)
        }
        this.bensAndDiretos.push(bensDir);
      }
      let taxa = (tr.valorTotal / totalOperacoes) * el.totalTaxas;
      if (tr.couv.toUpperCase() == 'C') {
        bensDir.quantidadeFinal += tr.quantidade;
        bensDir.valorTotalFinal += tr.valorTotal - taxa;
      }
      else {
        let precoMedio = bensDir.quantidadeFinal = !0 ?
          bensDir.valorTotalFinal / bensDir.quantidadeFinal : 0;
        bensDir.quantidadeFinal -= tr.quantidade;
        bensDir.valorTotalFinal -= (tr.quantidade * precoMedio);
      }
    });
  }


  processarPatrimonioInicial() {
    this.patrimonioLctos.forEach(lcto => {
      let dadosTicker = this.findTicker(lcto.ticker);

      let bensDirTemp: BemAndDireito = {
        corretora: lcto.Corretora,
        ticker: lcto.ticker,
        quantidadeInicial: lcto.quantidade,
        valorTotalInicial: lcto.valorTotal,
        quantidadeFinal: lcto.quantidade,
        valorTotalFinal: lcto.valorTotal,
        nomeEmpresa: dadosTicker?.nome ?? "Cadastre o Ticker",
        CNPJ: dadosTicker?.cnpj ?? "00.000.000/0000-00",
        tipoNoIr: this.convertTipoTickerTipoIR(dadosTicker?.tipoAtivo)
      }
      this.bensAndDiretos.push(bensDirTemp);

    });
  }




  convertTipoTickerTipoIR(tipo: TipoAtivo) {
    if (tipo == undefined) return undefined;
    switch (tipo) {
      case TipoAtivo.TIPO_ACAO: return TipoNoIR.ACOES31
        break
      case TipoAtivo.TIPO_FII: return TipoNoIR.FII73
        break
      case TipoAtivo.TIPO_ETF: return TipoNoIR.ETF74
        break
      default: return undefined;
        break
    }
  }

  findBemAndDireito(corretora: string, ticker: string) {
    return this.bensAndDiretos.find(el => el.corretora === corretora && el.ticker === ticker)
  }

  findTicker(ticker: string) {
    return this.ativos.find(el => el.ticker == ticker);
  }

  carregarAtivos() {
    return this.bigfService.getAll(BigfServiceService.ATIVOS).pipe(take(1), map(res => {
      this.ativos = res;
      return this.ativos;
    }));
  }
  carregarNotas() {
    return this.bigfService.getAll(BigfServiceService.NOTAS_CORRETAGEM).pipe(take(1), map(res => {
      this.notas = res;
      return this.notas;
    }));
  }
  carregarPatrimonioInicial() {
    return this.bigfService.getAll(BigfServiceService.PATRIMONIO_INICIAL).pipe(take(1), map(res => {
      this.patrimonioLctos = res;
      return this.patrimonioLctos;
    }));
  }
}
