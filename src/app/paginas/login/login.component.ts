import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import {SplashScreen} from '@capacitor/splash-screen';
import { Platform } from '@ionic/angular';
import {App } from "@capacitor/app";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public form!: FormGroup;
  public loginInvalido = false;
  public validando = false;
  public accesosRapidos = false;
  public cargando = false;

  constructor(private fb: FormBuilder,private router : Router, private db: DatabaseService){ 
    this.db.usuario = undefined;
    this.form = this.fb.group({
      'email': ['', [Validators.required, Validators.email]],
      'password':['', [Validators.required]],
    });
  }

  ngAfterViewInit(){
    if(this.db.usuario){
      this.db.usuario = undefined;
    }
    else{
      this.cargando = true;
      setTimeout(()=>{
        SplashScreen.hide();
        setTimeout(()=>{
          this.cargando = false;
        }, 2500);
      }, 500); 
    }

  }

  Login(){
    this.limpiarEspacios();
    this.loginInvalido = false;
    this.validando = true;
    const usuario = this.form.value;
    const sub = this.db.obtenerUsuarios().subscribe(listaUsuarios=>{
      sub.unsubscribe();
      for(let datos of listaUsuarios){
        if(datos.correo == usuario.email && datos.clave == usuario.password){
          datos.clave = "";
          this.db.login(datos);
          this.validando = false;
          this.limpiarInputs();
          this.router.navigate(["credito"]);
          return;
        }
      }
      this.loginInvalido = true;
      this.validando = false;
    });
  }

  private limpiarEspacios(){
    this.form.get('email')?.setValue(this.form.get('email')?.value.trim());
    this.form.get('password')?.setValue(this.form.get('password')?.value.trim());
  }

  private limpiarInputs(){
    this.form.get('email')?.setValue("");
    this.form.get('password')?.setValue("");
  }

  completarInvitado(){
    this.accesosRapidos = false;
    this.completarForm("invitado@invitado.com", "222222");
  }

  completarAdmin(){
    this.accesosRapidos = false;
    this.completarForm("admin@admin.com", "111111");
  }

  completarUsuario(){
    this.accesosRapidos = false;
    this.completarForm("usuario@usuario.com", "333333");
  }

  completarAnonimo(){
    this.accesosRapidos = false;
    this.completarForm("anonimo@anonimo.com", "444444");
  }

  completarTester(){
    this.accesosRapidos = false;
    this.completarForm("tester@tester.com", "555555");
  }

  iniciarAccesoRapido(){
    this.accesosRapidos = true;
  }

  cerrarAccesoRapido(){
    this.accesosRapidos = false;
  }

  private completarForm(email: string, password: string){
    this.form.get('email')?.setValue(email);
    this.form.get('password')?.setValue(password);
  }

}
