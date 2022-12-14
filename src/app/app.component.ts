import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

interface Componente{
  icon:string;
  name:string;
  redirecTo:string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {}

  componentes: Componente[]=[
    {
      icon:'eye-outline',
      name: 'Contexto',
      redirecTo: '/contexto',
    },
    {
      icon: 'qr-code-outline',
      name: 'Registro',
      redirecTo: '/qr',
    },
    {
      icon: 'calendar-outline',
      name: 'Feriados',
      redirecTo: '/feriados',
    },
  ];

  logout(navController:NavController){
    localStorage.removeItem('ingresado')
    localStorage.removeItem('nombre')
  }

}
