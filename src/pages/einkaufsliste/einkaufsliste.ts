import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Gekauft } from '../gekauft/gekauft';
import { Produktsuche } from '../produktsuche/produktsuche';
import { ToastController } from 'ionic-angular';

class Item {title: string, note: string, icon: string}

@Component({
  selector: 'page-einkaufsliste',
  templateUrl: 'einkaufsliste.html'
})
export class Einkaufsliste {
  items: Item[];
  shoppingList: Array<{id: number, title: string, type: string, description: string, isBought: boolean, co2Value: number}>;
  isListEmpty: boolean;
  isItemOpen: boolean;
  score: number;
  level2: number;
  level3: number;
  level4:number;
  level5: number;
  missingPoints = 0;
  shoppingListScore = 0;
  newPoints: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public toastCtrl: ToastController) {
     this.isItemOpen = false;

     this.score = parseInt(window.localStorage.getItem("score"));

     /*this.shoppingList = unfilteredList.filter(item => {
       return !item.isBought;
     });*/

     this.level2 = parseInt(window.localStorage.getItem("level2"));
     this.level3 = parseInt(window.localStorage.getItem("level3"));
     this.level4 = parseInt(window.localStorage.getItem("level4"));
     this.level5 = parseInt(window.localStorage.getItem("level5"));
  }

  ionViewWillEnter() {
    var unfilteredList = JSON.parse(window.localStorage.getItem("shopping_list"));
    this.shoppingList = unfilteredList;
    if (this.shoppingList.length == 0) this.isListEmpty = true;
    else this.isListEmpty = false;
  }

  itemTapped(event, item) {
    this.navCtrl.push(Einkaufsliste, {
      item: item
    });
  }

  openSearch(){
    this.navCtrl.push(Produktsuche);
  }

  showScore(){
    let alert = this.alertCtrl.create({
      title: 'Dein Punktzahl ist ' + this.score,
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
    } else if (this.score <= this.level5) {
      this.missingPoints = 0;
    }
    return this.missingPoints;
  }

  markAsBought(item, listItem){
    item.isBought = true;
    this.shoppingList.splice(this.shoppingList.indexOf(item), 1);
    //this.shoppingList.push(item);
    //window.localStorage.setItem("shopping_list", JSON.stringify(this.shoppingList));
    console.log(this.shoppingList);
    this.close(listItem);

    var co2Value = item.co2value;
    this.changeScore(co2Value, item);

  }

  changeScore(co2Value, item){
    this.newPoints = (1 / co2Value) * 3000 + 0.7;
    this.newPoints = Math.round(this.newPoints);
    this.score += this.newPoints;
    window.localStorage.setItem("score", JSON.stringify(this.score));

    //füge einen boolean zu dem Ingredient das markiert ob dieser gekauft wurde
    item['newPoints'] = this.newPoints;
    //füge angeklicktes item zu liste dazu
    this.shoppingList.push(item);
    //überschreibe die Einkaufsliste im Local Storage mit der neuen Liste
    window.localStorage.setItem("shopping_list", JSON.stringify(this.shoppingList));

    if (this.newPoints == 1) {
      let toast = this.toastCtrl.create({
        message: this.newPoints + ' neuer Punkt!',
        duration: 1000,
        position: 'bottom'
    //  styling: { backgroundColor?: einkaufslisteColor,  }
      });
        toast.present();
    } else {
    let toast = this.toastCtrl.create({
      message: this.newPoints + ' neue Punkte!',
      duration: 1000,
      position: 'bottom'
  //  styling: { backgroundColor?: einkaufslisteColor,  }
    });
    toast.present();
  }
  }

  deleteItem(item) {
    this.shoppingList.splice(this.shoppingList.indexOf(item), 1);
    window.localStorage.setItem("shopping_list", JSON.stringify(this.shoppingList));
  }

  deleteEverything(){
    window.localStorage.setItem("shopping_list", '[]');
    this.shoppingList = JSON.parse(window.localStorage.getItem("shopping_list"));
    this.isListEmpty = true;
  }

  showInfo(item) {
    console.log(JSON.stringify(item));
    let confirm = this.alertCtrl.create({
      title: item.title,
      message: 'Dieses Produkt kommt aus ' + item["origin"] + ' und wird per ' + item["transport"] + ' transportiert. Es hat pro kg Gewicht einen CO<sub>2</sub> Fußabdruck von ' + item["co2value"] + 'g.',
      buttons: ['OK']
      });
    confirm.present();
  }
/*
  showShoppingListScore(){
      console.log('ich war hier');
    this.shoppingList.forEach(item => {
      if (item["isBought"]) {
          this.shoppingListScore = this.shoppingListScore + item["co2value"];
      }
    });
    this.navCtrl.push(this.shoppingListScore);
    //return this.shoppingListScore;
}
*/
open(itemSlide, item) {
    // reproduce the slide on the click
    itemSlide.setElementClass("active-sliding", true);
    itemSlide.setElementClass("active-slide", true);
    itemSlide.setElementClass("active-options-right", true);
    item.setElementStyle("transform", "translate3d(-241px, 0px, 0px)");
}

close(item) {
    item.close();
    item.setElementClass("active-sliding", false);
    item.setElementClass("active-slide", false);
    item.setElementClass("active-options-right", false);
}

}
