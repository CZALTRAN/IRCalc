import { AbstractModel } from "./AbstractModel";
import { NotaCorretagemDetalhe } from "./NotaCorretagemDetalhe";

export interface NotaCorretagem extends AbstractModel{
    nomeCorretora:string;
    
    
    totalCompra:number;
    totalVenda:number;
    
    //totalVenda - totalCompra
    liquidoOper:number;
    
    //liquidoFinal - liquidoOper
    totalTaxas:number;

    liquidoFinal:number;

    trasacoes:NotaCorretagemDetalhe[]
}