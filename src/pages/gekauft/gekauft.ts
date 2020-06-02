import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

/*
  Generated class for the Gekauft page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-gekauft',
  templateUrl: 'gekauft.html'
})
export class Gekauft {
  boughtList: Array<{id: number, title: string, type: string, description: string, isBought: boolean}>;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
    //Einkaufliste aus dem Local Storage holen
    var unfilteredList = JSON.parse(window.localStorage.getItem("shopping_list"));
    //Liste nach gekauften Objekten filtern
    this.boughtList = unfilteredList.filter(item => {
        return item.isBought; 
    });
  }

  ionViewDidLoad() {
    console.log('Hello Gekauft Page');
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Name des Produkts',
      message: 'Dieses Produkt hat pro Kg Gewicht einen CO2 Fußabdruck von 300gr. Das ist nicht sehr hoch.',
      buttons: ['OK']
      });
    alert.present();
  }

}
