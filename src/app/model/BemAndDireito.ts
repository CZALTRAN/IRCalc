import { AbstractModel } from "./AbstractModel";

export enum TipoNoIR{
    ACOES31 = "ACOES31",
    FII73 = "FII73",
    ETF74 = "ETF74"
}

export interface BemAndDireito  extends AbstractModel{
    //dados inseridos
    corretora: string;
    ticker: string;
    quantidadeInicial: number;
    valorTotalInicial: number;

    //dados calculados

    quantidadeFinal: number;
    valorTotalFinal: number;

    //dados que podem ser cruzados
    nomeEmpresa: string;
    CNPJ: string;


    tipoNoIr?:TipoNoIR;

} 