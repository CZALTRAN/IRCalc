import {TipoAtivo} from './Ativo';

export interface VendaOperacao {
  dataVenda: Date;
  mes: number;
  ano: number;
  precomedio: number;
  valorVenda: number;
  taxasVenda: number;
  lucroVenda: number;
  quantidade: number;
  ticker: string;
  tipo: TipoAtivo; // comum ou normal
}
