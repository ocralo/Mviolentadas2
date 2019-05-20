import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';//componente para abrir paginas en el navegador del celular

@Component({
  selector: 'app-network-twitter',
  templateUrl: './network-twitter.page.html',
  styleUrls: ['./network-twitter.page.scss'],
})
export class NetworkTwitterPage implements OnInit {

  constructor(private navCtrl: NavController, private iab: InAppBrowser) { }

  ngOnInit() {
  }
  Back(){
    this.navCtrl.navigateRoot("/list"); //navegar a la pagina anterior la de los psicologos
  }
  /** Metodo para dirigir a las paginas de facebook */
  OnuMujeres(){
    this.iab.create('https://twitter.com/ONUMujeres?s=08','_system');
  }
}
