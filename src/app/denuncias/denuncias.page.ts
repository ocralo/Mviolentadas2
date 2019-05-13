import { Component, OnInit } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-denuncias',
  templateUrl: './denuncias.page.html',
  styleUrls: ['./denuncias.page.scss'],
})
export class DenunciasPage implements OnInit {

  constructor(private call: CallNumber) { }

  async callNumber(): Promise<any>{
    try {
        await this.call.callNumber('3128662953', true);
    } catch(e){
        console.error(e); 
    }
}
  ngOnInit() {
  }

}
