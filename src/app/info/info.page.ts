import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';//componente de ionic para abrir enlaces en el navegador del telefono

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {

  constructor(private iab:InAppBrowser) { }

  ngOnInit() {
  }
/** Metodo para abrir enlaces en el navegador del celular */
  Course(){
    this.iab.create('https://campus.uaovirtual.edu.co/user/index.php?id=1046&newcourse=1','_system');
  }
/** Metodo para abrir enlaces en el navegador del celular */
  Rules(){
    this.iab.create('https://www.oas.org/dil/esp/LEY_1257_DE_2008_Colombia.pdf','_system');
  }
}
