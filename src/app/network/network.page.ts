import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';//componente para abrir paginas en el navegador del celular


@Component({
  selector: 'app-network',
  templateUrl: './network.page.html',
  styleUrls: ['./network.page.scss'],
})
export class NetworkPage implements OnInit {

  constructor( private navCtrl: NavController, private iab: InAppBrowser ) { }

  ngOnInit() {
  }
  Back(){
    this.navCtrl.navigateRoot("/list"); //navegar a la pagina anterior la de los psicologos
  }
  /** Metodo para dirigir a las paginas de facebook */
  CasaMatria(){
    this.iab.create('https://www.facebook.com/casamatriacali/','_system');
  }
  MujeresEmprendedoras(){
    this.iab.create('https://www.facebook.com/groups/954897684669356/','_system');
  }
  MujeresEmpoderadas(){
    this.iab.create('https://www.facebook.com/empoderatemujer/','_system');
  }
}
