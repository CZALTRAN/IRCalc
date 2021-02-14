import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuth } from "@angular/fire/auth";
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './services/login.service';
import { AuthGuard } from './guard/auth.guard';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { AtivosComponent } from './ativos/ativos.component';
import { NotasComponent } from './notas/notas.component';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { MenuModule } from 'primeng/menu';
import {MenubarModule} from 'primeng/menubar';
import {InputTextModule} from 'primeng/inputtext';
import { PatrimonioInicialComponent } from './patrimonio-inicial/patrimonio-inicial.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MenuComponent,
    AtivosComponent,
    NotasComponent,
    PatrimonioInicialComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ToolbarModule,
    ButtonModule,
    TableModule,
    FormsModule,
    MenuModule,
    MenubarModule,
    InputTextModule,
    AngularFireModule.initializeApp(environment.firebase)

  ],
  providers: [AuthGuard, LoginService, AngularFireModule, AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }