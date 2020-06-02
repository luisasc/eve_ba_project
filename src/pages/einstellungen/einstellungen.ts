import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-einstellungen',
  templateUrl: 'einstellungen.html'
})
export class Einstellungen {
  items: Array<{title: string, note: string, icon: string}>;
  location;
  score: number;
  level2: number;
  level3: number;
  level4: number;
  level5: number;
  missingPoints = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public toastCtrl: ToastController) {
    this.score = parseInt(window.localStorage.getItem("score"));
    this.location = window.localStorage.getItem("location");

    this.level2 = parseInt(window.localStorage.getItem("level2"));
    this.level3 = parseInt(window.localStorage.getItem("level3"));
    this.level4 = parseInt(window.localStorage.getItem("level4"));
    this.level5 = parseInt(window.localStorage.getItem("level5"));
  }

  itemTapped(event, item) {
    this.navCtrl.push(Einstellungen, {
      item: item
    });
  }

  showAlert() {
    //check if disabled is true
    let alert = this.alertCtrl.create({
      title: 'Oh nein!',
      message: 'Dafür hast du noch nicht genügend Punkte. Arbeite weiter an deiner Punktzahl!',
      buttons: ['OK']
    });
    alert.present();
  }

  reset(){
    //RESET EVERYTHING
    window.localStorage.setItem("shopping_list", '[]');
    window.localStorage.setItem("score", '0');
    window.localStorage.setItem("ingredients", '[]');
    window.localStorage.setItem("ingredient_list", '[]');
    window.localStorage.setItem("location", 'Deutschland');
    console.log('reset done');

    let toast = this.toastCtrl.create({
      message: 'Reset durchgeführt!',
      duration: 3000,
      position: 'bottom',
    });
    toast.present();
  }

  showScore(){
    let alert = this.alertCtrl.create({
      title: 'Deine Punktzahl ist ' + this.score,
      message: 'Du benötigst ' + this.calculateMissingPoints() + ' Punkte für das nächste Level.',
      buttons: ['OK']
    });
    alert.present();
  }

  calculateMissingPoints(){
    if (this.score < this.level2){
      this.missingPoints = this.level2 - this.score;
    } else if (this.score >= this.level2 && this.score < this.level3) {
      this.missingPoints = this.level3 - this.score;
    } else if (this.score >= this.level3 && this.score < this.level4) {
      this.missingPoints = this.level4 - this.score;
    } else if (this.score >= this.level4 && this.score < this.level5) {
      this.missingPoints = this.level5 - this.score;
    }
    return this.missingPoints;
  }

  ionViewWillLeave() {
    this.location = window.localStorage.setItem("location", this.location);
  }
}
