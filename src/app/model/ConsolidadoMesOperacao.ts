import {VendaOperacao} from './VendaOperacao';
import {TipoAtivo} from './Ativo';

export interface ConsolidadoMesOperacao {
  mes: number;
  ano: number;
  operacoes: VendaOperacao[];
  tipo: TipoAtivo; // comum ou normal
  totalVenda: number;
  totalLucro: number;
}
