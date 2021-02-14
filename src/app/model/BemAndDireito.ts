import { AbstractModel } from "./AbstractModel";


export interface BemAndDireito  extends AbstractModel{
    //dados inseridos
    Corretora: String;
    ticker: number;
    quantidadeInicial: number;
    valorTotalInicial: number;

    //dados calculados
    precoMedioInicial: number;

    quantidadeFinal: number;
    valorTotalFinal: number;
    precoMedioFinal: number;

    //dados que podem ser cruzados
    nomeEmpresa: string;
    CNPJ: string;

    /*
    31 - Ações
    73 - Fundo de investimento Imobiliario
    */
    tipoNoIr:number;

} 