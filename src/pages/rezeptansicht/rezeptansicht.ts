import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-rezeptansicht',
  templateUrl: 'rezeptansicht.html'
})
export class Rezeptansicht {
  recipe;
  heartCounter: number;
  addAllBoolean: boolean;
  addAllCounter: number;

  constructor(public navCtrl: NavController, private navParams: NavParams, public alertCtrl: AlertController, public toastCtrl: ToastController) {
    this.recipe = navParams.get('recipe');
    console.log(navParams);
    this.heartCounter = 0;
    this.addAllCounter = 0;
  }


  heartClicked(){
    this.heartCounter ++;
    if (this.heartCounter%2 == 1){
      console.log('heart clicked');
    //  document.getElementById('heart').className = "heart-clicked";

    } else {
        console.log('heart unclicked');

    }

  }

  showAlert(ingredient) {
    let alert = this.alertCtrl.create({
      title: ingredient['title'],
      message: 'Dieses Produkt hat pro kg Gewicht einen CO<sub>2</sub> Fußabdruck von ' +  ingredient['co2value'] + 'g.',
      buttons: ['OK']
    });
    alert.present();
  }

markAsBought(ingredient){
    //hole einkaufsliste aus localstorage, parsen zum list type
    var list = JSON.parse(window.localStorage.getItem("shopping_list"));
    //füge einen boolean zu dem Ingredient das markiert ob dieser gekauft wurde
    ingredient['isBought'] = false;
    ingredient['amount'] = ingredient.amount;
    ingredient['origin'] = "USA";
    ingredient['transport'] = "Flugzeug";

    //füge angeklicktes item zu liste dazu
    list.push(ingredient);
    //überschreibe die Einkaufsliste im Local Storage mit der neuen Liste
    window.localStorage.setItem("shopping_list", JSON.stringify(list));


  let toast = this.toastCtrl.create({
    message: ingredient.title + ' zur Einkaufsliste hinzugefügt.',
    duration: 3000,
    position: 'bottom',
    //  cssClass: 'toastColor'
  });
  toast.present();
}

addAllIngredients(recipeIngredients){
/* click/unclick
  this.addAllCounter ++;
  if (this.addAllCounter%2 == 1){
    console.log('addAllIngredients clicked');
    this.addAllBoolean = true;
  } else {
    console.log('addAllIngredients unclicked');
      this.addAllBoolean = false;}*/

      recipeIngredients.forEach(item => {
      //hole einkaufsliste aus localstorage, parsen zum list type
      var list = JSON.parse(window.localStorage.getItem("shopping_list"));
      //füge einen boolean zu dem Ingredient das markiert ob dieser gekauft wurde
      item['isBought'] = false;
      item['amount'] = item.amount;
      item['origin'] = "Europa";
      item['transport'] = "LKW";
      //füge angeklicktes item zu liste dazu
      list.push(item);
      //überschreibe die Einkaufsliste im Local Storage mit der neuen Liste
      window.localStorage.setItem("shopping_list", JSON.stringify(list));
    });
    let toast = this.toastCtrl.create({
      message: 'Zutaten zur Einkaufsliste hinzugefügt.',
      duration: 3000,
      position: 'bottom',
    });
    toast.present();
}

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
