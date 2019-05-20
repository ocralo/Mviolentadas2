import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit { //coloca una lista en una pagina
  private selectedItem: any;
  private icons = [
    'flask',
    'wifi',
    'beer',
    'football',
    'basketball',
    'paper-plane',
    'american-football',
    'boat',
    'bluetooth',
    'build'
  ];
  /** Arreglo con la lista de psicologos para dirigirlos a que les envien un mensaje al psicologo */
  public items: Array<{ title: string; note: string; icon: string }> = [];
  constructor(private nvctrl:NavController) {
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  ngOnInit() {
  }
  /**Metodo para nevegar a la pagina de redes en facebook */
  NetworkSupportFacebook(){
    this.nvctrl.navigateRoot('/network');
  }
  
}
