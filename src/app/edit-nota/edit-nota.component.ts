import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotaCorretagem } from '../model/NotaCorretagem';
import { BigfServiceService } from '../services/bigf-service.service';

@Component({
  selector: 'app-edit-nota',
  templateUrl: './edit-nota.component.html',
  styleUrls: ['./edit-nota.component.css']
})
export class EditNotaComponent implements OnInit {

  uidNota: string;
  notaCorretagem: NotaCorretagem;
  quantidadeOperacoes:number;

  constructor(
    private route: ActivatedRoute,
    private bigfService: BigfServiceService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.uidNota = params['uid'];
      if (this.uidNota === 'novo') {
        this.notaCorretagem = this.criarNotaVazia();
      }
      else{
        this.carregarNota(this.uidNota);
      }
    });
  }

  criarNotaVazia(): NotaCorretagem {
    let ret: NotaCorretagem = {
      liquidoFinal: 0,
      liquidoOper: 0,
      nomeCorretora: '',
      totalCompra: 0,
      totalTaxas: 0,
      totalVenda: 0,
      trasacoes: []
    };
    return ret;
  }

  carregarNota(uidNota:string) {
    this.bigfService.getObject(BigfServiceService.NOTAS_CORRETAGEM, uidNota);
  }



}
