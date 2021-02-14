import { AbstractModel } from "./AbstractModel";


export interface Ativo extends AbstractModel{
    ticker:string;
    nome:string;
    razaoSocial:string;
    cnpj:string;
    fontePagadora?:string;
    cnpjPagadora?:string;
}