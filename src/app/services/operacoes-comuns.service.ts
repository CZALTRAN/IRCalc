import {Injectable} from '@angular/core';
import {BigfServiceService} from './bigf-service.service';
import {forkJoin, Observable, Subject} from 'rxjs';
import {VendaOperacao} from '../model/VendaOperacao';
import {Ativo} from '../model/Ativo';
import {NotaCorretagem} from '../model/NotaCorretagem';
import {map, take} from 'rxjs/operators';
import {convertValueToOutputAst} from '@angular/compiler/src/output/value_util';
import {PatrimonioLcto} from '../model/PatrimonioLcto';
import {NotaCorretagemDetalhe} from '../model/NotaCorretagemDetalhe';

@Injectable({
  providedIn: 'root'
})
export class OperacoesComunsService {

  subVendasOperacaoComum: Subject<VendaOperacao[]>;
  subVendasOperacaoFII: Subject<VendaOperacao[]>;

  private vendasOperacaoComum: VendaOperacao[];
  private vendasOperacaoFII: VendaOperacao[];
  ativos: Ativo[];
  notas: NotaCorretagem[];
  patrimonioLctos: PatrimonioLcto[];


  constructor(private bigfService: BigfServiceService) {
    this.subVendasOperacaoComum = new Subject<VendaOperacao[]>();
    this.subVendasOperacaoFII = new Subject<VendaOperacao[]>();
  }

  calcularOperacoesComum(): void {
    this.vendasOperacaoComum = [];
    forkJoin([this.carregarAtivos(), this.carregarNotas(), this.carregarPatrimonioInicial()]).subscribe(
      res => {
        this.processarNotas();
        this.subVendasOperacaoComum.next(this.vendasOperacaoComum);
      });
  }

  carregarAtivos(): Observable<Ativo[]> {
    return this.bigfService.getAll(BigfServiceService.ATIVOS).pipe(take(1), map(res => {
      this.ativos = res;
      return this.ativos;
    }));
  }

  carregarNotas(): Observable<NotaCorretagem[]> {
    return this.bigfService.getAll(BigfServiceService.NOTAS_CORRETAGEM).pipe(take(1), map(res => {
      this.notas = res;
      return this.notas;
    }));
  }

  findTicker(ticker: string): Ativo {
    return this.ativos.find(el => el.ticker === ticker);
  }


  private processarNotas(): void {
    this.vendasOperacaoComum = [];
    this.notas.forEach(nota => {
      nota.transacoes.forEach(tr => {
        if (tr.couv === 'V') {
          console.log(tr);
          const dadosTicker = this.findTicker(tr.ticker);
          const dataVenda = new Date(nota.dataMovimentacao);
          const precomedio = this.calcularPrecoMedio(nota, tr, dadosTicker);
          const taxasVenda = (nota.totalTaxas / (nota.totalVenda + nota.totalCompra)) * tr.valorTotal;
          const oper: VendaOperacao = {
            dataVenda,
            ano: dataVenda.getFullYear(),
            mes: dataVenda.getMonth(),
            ticker: tr.ticker,
            valorVenda: tr.valorTotal,
            tipo: dadosTicker.tipoAtivo,
            taxasVenda,
            quantidade: tr.quantidade,
            precomedio,
            lucroVenda: (tr.valorTotal - taxasVenda) - (precomedio * tr.quantidade)
          };
          this.vendasOperacaoComum.push(oper);
        }

      });
    });
  }

  private carregarPatrimonioInicial(): Observable<PatrimonioLcto[]> {
    return this.bigfService.getAll(BigfServiceService.PATRIMONIO_INICIAL).pipe(take(1), map(res => {
      this.patrimonioLctos = res;
      return this.patrimonioLctos;
    }));
  }

  private calcularPrecoMedio(nota: NotaCorretagem, tr: NotaCorretagemDetalhe, ticker: Ativo): number {
    let valorTotal = 0;
    let quantidadeTotal = 0;
    const patrimonioInicial = this.patrimonioLctos.find(p => p.ticker === ticker.ticker);
    if (patrimonioInicial !== undefined) {
      valorTotal = patrimonioInicial.valorTotal;
      quantidadeTotal = patrimonioInicial.quantidade;
    }
    const dataRef = new Date(nota.dataMovimentacao);
    this.notas.forEach(notaIt => {
      nota.transacoes.forEach(trIt => {
        const dataNota = new Date(notaIt.dataMovimentacao);
        if (dataNota.getTime() < dataRef.getTime() && trIt.couv === 'C' && trIt.ticker === ticker.ticker) {
          valorTotal += trIt.valorTotal;
          quantidadeTotal += trIt.quantidade;
        }
      });
    });
    return valorTotal / quantidadeTotal;

  }
}
