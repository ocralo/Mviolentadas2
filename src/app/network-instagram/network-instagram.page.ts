import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';//componente para abrir paginas en el navegador del celular

@Component({
  selector: 'app-network-instagram',
  templateUrl: './network-instagram.page.html',
  styleUrls: ['./network-instagram.page.scss'],
})
export class NetworkInstagramPage implements OnInit {

  constructor(private navCtrl: NavController, private iab: InAppBrowser) { }

  ngOnInit() {
  }
  Back(){
    this.navCtrl.navigateRoot("/list"); //navegar a la pagina anterior la de los psicologos
  }
  /** Metodo para dirigir a las paginas de facebook */
  sitioMujeres(){
    this.iab.create('https://www.instagram.com/sitioparamujeres/?igshid=16b30ayhsz7eu','_system');
  }
  MujeresEmprendedoras(){
    this.iab.create('https://www.instagram.com/mujeresemprendedorascali1/?igshid=1k2uigkaij8b5','_system');
  }
  
}
