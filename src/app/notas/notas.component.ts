import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { NotaCorretagem } from '../model/NotaCorretagem';
import { BigfServiceService } from '../services/bigf-service.service';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})
export class NotasComponent implements OnInit {



  notas: NotaCorretagem[]
  constructor(
    private bigfService: BigfServiceService,
    public afAuth: AngularFireAuth,
    private router: Router) {

  }

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.carregarDados();
      }
    });
  }

  carregarDados() {
    this.bigfService.getAll(BigfServiceService.NOTAS_CORRETAGEM).subscribe(res => {
      this.notas = res;
    });
  }

  insertNota() {
    this.router.navigate(['/insNotas', 'novo']);

  }
  editarNota(key) {
    this.router.navigate(['/insNotas', key]);
  }
  removerNota(key) {
    this.bigfService.delete(BigfServiceService.NOTAS_CORRETAGEM, key);
  }

}
