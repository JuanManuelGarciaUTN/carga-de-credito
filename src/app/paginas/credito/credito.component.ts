import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-credito',
  templateUrl: './credito.component.html',
  styleUrls: ['./credito.component.scss'],
})
export class CreditoComponent  implements OnInit {

  public scaneando = false;
  public error = "";
  public borrar = false;

  constructor(private db: DatabaseService, private router: Router, private platform: Platform) {}

   get puntos(){
    return this.db.puntos;
   }
  ngOnInit() {}

  ngDestroy(){
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
  }
  
  async Scanear(){
    this.platform.backButton.subscribeWithPriority(140, () => {
      document.querySelector('body')!.classList.remove('scanner-active');
      BarcodeScanner.showBackground();
      BarcodeScanner.stopScan();
      this.scaneando = false;
    });
    this.scaneando = true;
    document.querySelector('body')!.classList.add('scanner-active');

    // Check camera permission
    // This is just a simple example, check out the better checks below
    await BarcodeScanner.checkPermission({ force: true });

    // make background of WebView transparent
    // note: if you are using ionic this might not be enough, check below
    BarcodeScanner.hideBackground();
    const result = await BarcodeScanner.startScan(); // start scanning and wait for a result

    document.querySelector('body')!.classList.add('scanner-active');
    // if the result has content
    if (result.hasContent) {
      switch (result.content) {
        case "2786f4877b9091dcad7f35751bfcf5d5ea712b2f":
          if(this.db.usuario?.clave2786f4877b9091dcad7f35751bfcf5d5ea712b2f == 0){
            this.db.usuario.clave2786f4877b9091dcad7f35751bfcf5d5ea712b2f+= 1;
          }
          else if (this.db.usuario?.clave2786f4877b9091dcad7f35751bfcf5d5ea712b2f == 1 && this.db.usuario.tipo == "admin"){
            this.db.usuario.clave2786f4877b9091dcad7f35751bfcf5d5ea712b2f+= 1;
          }
          else{
            this.error = "Ya se ingresó este código por " + this.db.usuario?.clave2786f4877b9091dcad7f35751bfcf5d5ea712b2f + "° vez";
          }
          this.db.actualizarDatos(this.db.usuario);
          break;
          
        case "ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172":
          if(this.db.usuario?.claveae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172 == 0){
            this.db.usuario.claveae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172+= 1;
          }
          else if (this.db.usuario?.claveae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172 == 1 && this.db.usuario.tipo == "admin"){
            this.db.usuario.claveae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172+= 1;
          }
          else{
            this.error = "Ya se ingresó este código por " + this.db.usuario?.claveae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172 + "° vez";
          }
          this.db.actualizarDatos(this.db.usuario);
          break;

        case "8c95def646b6127282ed50454b73240300dccabc":
          if(this.db.usuario?.clave8c95def646b6127282ed50454b73240300dccabc == 0){
            this.db.usuario.clave8c95def646b6127282ed50454b73240300dccabc+= 1;
          }
          else if (this.db.usuario?.clave8c95def646b6127282ed50454b73240300dccabc == 1 && this.db.usuario.tipo == "admin"){
            this.db.usuario.clave8c95def646b6127282ed50454b73240300dccabc+= 1;
          }
          else{
            this.error = "Ya se ingresó este código por " + this.db.usuario?.clave8c95def646b6127282ed50454b73240300dccabc + "° vez";
          }
          this.db.actualizarDatos(this.db.usuario);
          break;
      
        default:
          if(result.content.trim() == "ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172"){
            if(this.db.usuario?.claveae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172 == 0){
              this.db.usuario.claveae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172+= 1;
            }
            else if (this.db.usuario?.claveae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172 == 1 && this.db.usuario.tipo == "admin"){
              this.db.usuario.claveae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172+= 1;
            }
            else{
              this.error = "Ya se ingresó este código por " + this.db.usuario?.claveae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172 + "° vez";
            }
            this.db.actualizarDatos(this.db.usuario);
          }
          else{
            this.error = "No es un código QR registrado" + (result.content.trim() == "ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172").toString();
          }
          break;
      }
    }
    else{
      this.error = "No se pudo leer ningún código QR"
    }
    document.querySelector('body')!.classList.remove('scanner-active');
    this.scaneando = false;
  }

  IntentarBorrar(){
    this.borrar = true;
  }
  Borrar(){
    if(this.db.usuario){
      this.db.usuario.clave2786f4877b9091dcad7f35751bfcf5d5ea712b2f = 0;
      this.db.usuario.clave8c95def646b6127282ed50454b73240300dccabc = 0;
      this.db.usuario.claveae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172 = 0;
      this.db.actualizarDatos(this.db.usuario);
      this.borrar = false;
    }
  }
  Cancelar(){
    this.borrar = false;
    this.error = "";
  }

  CerrarSesion(){
    this.router.navigate(['home'])
  }
}
