import { AbstractModel } from "./AbstractModel";

export interface PatrimonioLcto extends AbstractModel{
    //dados inseridos
    Corretora: string;
    ticker: string;
    quantidade?: number;
    valorTotal?: number;

}