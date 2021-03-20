import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { BemAndDireito } from '../model/BemAndDireito';
import { BensDireitosService } from '../services/bens-direitos.service';

@Component({
  selector: 'app-bens-direitos',
  templateUrl: './bens-direitos.component.html',
  styleUrls: ['./bens-direitos.component.css']
})
export class BensDireitosComponent implements OnInit, OnDestroy {

  subBens: Subscription;
  bens: BemAndDireito[];


  constructor(
    private bensDirService: BensDireitosService,
    public afAuth: AngularFireAuth) {
  }

  ngOnInit(): void {
    this.subBens = this.bensDirService.subBensDireitos.subscribe(res => {
      this.bens = res;
    });
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.bensDirService.calcularBensDireitos();
      }
    })
  }

  ngOnDestroy() {
    this.subBens.unsubscribe();
  }

}
