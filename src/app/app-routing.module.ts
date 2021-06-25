import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AtivosComponent } from './ativos/ativos.component';
import { BensDireitosComponent } from './bens-direitos/bens-direitos.component';
import { EditNotaComponent } from './edit-nota/edit-nota.component';
import { AuthGuard } from './guard/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotasComponent } from './notas/notas.component';
import { OperacoesComunsComponent } from './operacoes-comuns/operacoes-comuns.component';
import { OperacoesFundosImobComponent } from './operacoes-fundos-imob/operacoes-fundos-imob.component';
import { PatrimonioInicialComponent } from './patrimonio-inicial/patrimonio-inicial.component';
import { RendimentosComponent } from './rendimentos/rendimentos.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path: '', component:HomeComponent, canActivate: [AuthGuard]},
  {path:'tickers', component:AtivosComponent, canActivate: [AuthGuard]},
  {path:'patrimonioInicial', component:PatrimonioInicialComponent, canActivate: [AuthGuard]},
  {path:'notas', component:NotasComponent, canActivate: [AuthGuard]},
  {path:'insNotas/:uid', component:EditNotaComponent, canActivate: [AuthGuard]},
  {path:'bensDireitos', component:BensDireitosComponent, canActivate: [AuthGuard]},
  {path:'operacoesComuns', component:OperacoesComunsComponent, canActivate: [AuthGuard]},
  {path:'operacoesFii', component:OperacoesFundosImobComponent, canActivate: [AuthGuard]},
  {path:'rendimentos', component:RendimentosComponent, canActivate: [AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
