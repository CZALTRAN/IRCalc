import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AtivosComponent } from './ativos/ativos.component';
import { AuthGuard } from './guard/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotasComponent } from './notas/notas.component';
import { PatrimonioInicialComponent } from './patrimonio-inicial/patrimonio-inicial.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path: '', component:HomeComponent, canActivate: [AuthGuard]},
  {path:'tickers', component:AtivosComponent, canActivate: [AuthGuard]},
  {path:'patrimonioInicial', component:PatrimonioInicialComponent, canActivate: [AuthGuard]},
  {path:'notas', component:NotasComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
