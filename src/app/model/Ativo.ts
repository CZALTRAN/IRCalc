import { AbstractModel } from "./AbstractModel";

export enum TipoAtivo{
    TIPO_ACAO  = "ACAO",
    TIPO_ETF = "ETF",
    TIPO_FII= "FII",
}

export interface Ativo extends AbstractModel{
    ticker:string;
    nome:string;
    razaoSocial:string;
    cnpj:string;
    fontePagadora?:string;
    cnpjPagadora?:string;
    tipoAtivo?:TipoAtivo;
}