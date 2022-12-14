import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

export interface Datos{
  rut: string;
  nomUsuario: string;
  correoUsuario: string;
  passUsuario: string;
  repassUsuario: string;
}

const ITEMS_KEY = 'my-datos';

@Injectable({
  providedIn: 'root'
})
export class ServicedatosService {

  private _storage : Storage;

  constructor(private storage:Storage) { 
    this.init();
   }

   //crea el storage 
  async init(){
    const storage = await this.storage.create();
    this._storage = storage;
  }

  //crear un objeto 
  async addDatos(dato: Datos):Promise<any>{
    return this.storage.get(ITEMS_KEY).then((datos: Datos[])=>{ 
      if(datos){
        datos.push(dato);         //creamos un nuevo obj en el almacen
        return this.storage.set(ITEMS_KEY, datos);
      }
      else
        return this.storage.set(ITEMS_KEY, [dato]);
    })
  }//fin del método


  //leer datos desde el almacen
  async getDatos():Promise<Datos[]>{
    return this.storage.get(ITEMS_KEY);
  }

  //actualizar un objeto del storage
  async updateDatos(dato: Datos):Promise<any>{
    return this.storage.get(ITEMS_KEY).then((datos: Datos[])=>{
      if(!datos || datos.length==0){
        return null;
      }
      let newDato: Datos[] = [];
      for (let i of datos){
        if(dato.rut == i.rut){
          newDato.push(dato);
        }
        else{
          newDato.push(i);
        }
      }
      this.storage.set(ITEMS_KEY, newDato);
     })
  }

  //método que elimina un objeto del storage
  async deleteDatos(rut:string):Promise<Datos>{
    return this.storage.get(ITEMS_KEY).then((datos : Datos[])=>{
      if (!datos || datos.length == 0){
        return null;
      }
      let toKeep: Datos[] = []; 
      for (let i of datos){
        if (i.rut !== rut){
          toKeep.push(i);
        }
      }
      return this.storage.set(ITEMS_KEY, toKeep);
    });
  }



}//fin de la clase
