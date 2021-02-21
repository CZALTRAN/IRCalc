import { Injectable, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database'
import { map } from 'rxjs/operators'
import { AbstractModel } from '../model/AbstractModel';
import { LoginService } from './login.service';
@Injectable({
  providedIn: 'root'
})
export class BigfServiceService {
  public static ATIVOS = 'ativos';
  public static PATRIMONIO_INICIAL = 'patrimonioInic';
  public static NOTAS_CORRETAGEM = 'notasCorretagem';

  private static baseUrl = '//'
  userUid:string;
  basePath:string;

  constructor(private dataBase: AngularFireDatabase) { 
    this.userUid = localStorage[LoginService.userUidKey];
    this.basePath = 'userData/'+this.userUid+'/';

  }

  patrimonioInicialPath:string;

  insert(table, data:AbstractModel) {
    return this.dataBase.list(this.basePath+table).push(data)
      .then((result: any) => {
        data.key = result.key
        console.log(result.key);
      });
  }

  updateSet(table, data:AbstractModel) {
    return this.dataBase.list(this.basePath+table).set(data.key, data)
      .catch((error: any) => {
        console.error(error);
      });
  }


  update(table, data:AbstractModel) {
    return this.dataBase.list(this.basePath+table).update(data.key, data)
      .catch((error: any) => {
        console.error(error);
      });
  }

  updateObjsect(table, data:AbstractModel[]){
    let dataObj = {};
    data.forEach(el => {
      dataObj[el.key] = el;
    });
    return this.dataBase.object(this.basePath+table).set(dataObj);
  }

  getAll(table) {
    return this.dataBase.list(this.basePath+table)
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({ key: c.payload.key, ... (c.payload as any).val() }));
        })
      );
  }

  getObject(table, key:string){
    this.dataBase.object(this.basePath+table+`/${key}`)
    .snapshotChanges()
    .pipe(
      map(changes=>{
        return {key:changes.payload.key, ...  (changes.payload as any).val()};
      })
    );
  }

  delete(table, key: string) {
    this.dataBase.object(this.basePath+table+`/${key}`).remove();
  }


}
