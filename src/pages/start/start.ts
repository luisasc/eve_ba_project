import { Component } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-start',
  templateUrl: 'start.html'

})
export class Start {
  score;
  ingredients = [];
  //Level Boundaries, saved as strings
  level2Def = '30';
  level3Def = '60';
  level4Def = '90';
  level5Def = '120';
  level2;
  level3;
  level4;
  level5;
  missingPoints = 0;

  constructor(public navCtrl: NavController, private http:Http, public alertCtrl: AlertController, public toastCtrl: ToastController) {

    //Punkte für level abspeichern
    window.localStorage.setItem("level2", this.level2Def);
    window.localStorage.setItem("level3", this.level3Def);
    window.localStorage.setItem("level4", this.level4Def);
    window.localStorage.setItem("level5", this.level5Def);

    this.level2 = parseInt(window.localStorage.getItem("level2"));
    this.level3 = parseInt(window.localStorage.getItem("level3"));
    this.level4 = parseInt(window.localStorage.getItem("level4"));
    this.level5 = parseInt(window.localStorage.getItem("level5"));

    this.score = parseInt(window.localStorage.getItem("score"));

    this.http.get('file:///android_asset/www/assets/JSON/ingredients_exhibition.json')
    .map(res => res.json())
    .subscribe((data) => {
      this.ingredients = data;
      console.log(this.ingredients);
      window.localStorage.setItem("ingredient_list", JSON.stringify(this.ingredients));
    });

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

  ionViewDidLoad() {

    if (this.score >= this.level2 && this.score < this.level3) {
      document.getElementById('start-background').className = "start-background-2";
      let toast = this.toastCtrl.create({
        message: 'Du bist auf Level 2, weiter so!',
        duration: 1000,
        position: 'bottom',
      });
      toast.present();
    } else if (this.score >= this.level3 && this.score < this.level4) {
      document.getElementById('start-background').className = "start-background-3";
      let toast = this.toastCtrl.create({
        message: 'Du bist auf Level 3, weiter so!',
        duration: 1000,
        position: 'bottom',
      });
      toast.present();
    } else if (this.score >= this.level4 && this.score < this.level5) {
      document.getElementById('start-background').className = "start-background-4";
      let toast = this.toastCtrl.create({
        message: 'Du bist auf Level 4, weiter so!',
        duration: 1000,
        position: 'bottom',
      });
      toast.present();
    } else if (this.score >= this.level5) {
      document.getElementById('start-background').className = "start-background-5";
      let toast = this.toastCtrl.create({
        message: 'Du bist auf Level 5, weiter so!',
        duration: 1000,
        position: 'bottom',
      });
      toast.present();
    }
  }
}
