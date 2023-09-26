import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore, collection, collectionData, doc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Usuario } from '../usuario';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  public usuario?: Usuario;
  constructor(private firestore: Firestore) {}

  get puntos(): number{
    let suma = 0 + this.usuario!.clave2786f4877b9091dcad7f35751bfcf5d5ea712b2f * 100 +
    this.usuario!.clave8c95def646b6127282ed50454b73240300dccabc * 10 +
    this.usuario!.claveae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172 * 50;
    if(isNaN(suma))
      return 0;
    return suma;
  }

  obtenerUsuarios(): Observable<Usuario[]>{
    const coleccion = collection(this.firestore, "usuarios");
    return collectionData(coleccion, {idField: 'id'}) as Observable<Usuario[]>;
  }

  actualizarDatos(usuario?: Usuario){
    if(usuario){
      const col = collection(this.firestore, "usuarios");
      const documento = doc(col, usuario.id);
      let datos = { clave2786f4877b9091dcad7f35751bfcf5d5ea712b2f: usuario.clave2786f4877b9091dcad7f35751bfcf5d5ea712b2f,
        clave8c95def646b6127282ed50454b73240300dccabc: usuario.clave8c95def646b6127282ed50454b73240300dccabc,
        claveae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172: usuario.claveae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172
      } as any;
      updateDoc(documento, datos);
    }
  }

  login(datos: Usuario){
    this.usuario = datos;
  }
}
