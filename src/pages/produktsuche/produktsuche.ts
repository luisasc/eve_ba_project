import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Http } from '@angular/http';

@Component({
  selector: 'page-produktsuche',
  templateUrl: 'produktsuche.html'
})


export class Produktsuche {
  ingredients;
  groupedItems = [];
  types = ["Obst", "Gemüse", "Brot und Gebäck", "Fleisch und Fisch", "Milchprodukte und Eier", "Zutaten und Gewürze", "Getreideprodukte", "Snacks und Süßwaren", "Sonstiges"];
  score: number;
  level2: number;
  level3: number;
  level4: number;
  level5: number;
  missingPoints = 0;
  min: any;
  max: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public toastCtrl: ToastController, public http: Http) {
    // If we navigated to this page, we will have an item available as a nav param
    this.score = parseInt(window.localStorage.getItem("score"));

    this.level2 = parseInt(window.localStorage.getItem("level2"));
    this.level3 = parseInt(window.localStorage.getItem("level3"));
    this.level4 = parseInt(window.localStorage.getItem("level4"));
    this.level5 = parseInt(window.localStorage.getItem("level5"));

    var counter = 0;

    this.ingredients = JSON.parse(window.localStorage.getItem("ingredient_list"));
    this.ingredients.forEach(item => {
      item["title"] = item["German"];
      item["type"] = item["Type"];
      item["co2value"] = item["co2Value"];

      counter++;
    });

    for (var i = 0; i < this.types.length; i++) {
      let items = this.ingredients.filter((item => {
        if (item.type.indexOf(this.types[i]) > -1) {
          return true;
        }
        else return false;
      }));
      this.groupedItems.push({type : this.types[i], items: items});
    }
  }

  itemTapped(event, item) {
  }

  itemClicked(item) {
    this.showPrompt(item);
  }

  randomInt(min, max){
    this.min = Math.ceil(min);
    this.max = Math.floor(max);
    return Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
  }

  showToast(item) {
    let toast = this.toastCtrl.create({
      message: item.title + ' wurde auf die Einkaufsliste geschrieben',
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

  search(searchEvent) {
    let term = searchEvent.target.value.toLowerCase();
    var foundItems = [];
    this.groupedItems = [];
    console.log(term);
    if (term != "") {
      foundItems = this.ingredients.filter((i) => {
        if (i.title.toLowerCase().indexOf(term) == 0) {
          return true;
        }
        else {
          return false;
        }
      });

      for (var i = 0; i < this.types.length; i++) {
        let items = foundItems.filter((item => {
          if (item.type.indexOf(this.types[i]) > -1) {
            return true;
          }
          else return false;
        }));
        this.groupedItems.push({type : this.types[i], items: items});
      }
    }
  }

  showPrompt(item) {
    let prompt = this.alertCtrl.create({
      //  title: 'Wie viel?',
      message: "Füge eine Menge hinzu:",
      inputs: [
        {
          name: 'amount',
          placeholder: 'Gramm',
          type: 'number'
        },
        {
          name: 'origin',
          placeholder: 'Woher kommt das Produkt?',
          type: 'string'
        },
        {
          name: 'transport',
          placeholder: 'Wie wurde es transportiert?',
          type: 'string'
        }
      ],
      buttons: [
        {
          text: 'Abbrechen',
          handler: data => {

          }

        },
        {
          text: 'Hinzufügen',
          handler: data => {
            if (data.amount > 0)
            {

              //hole einkaufsliste aus localStorage, parsen zum list type
              var list = JSON.parse(window.localStorage.getItem("shopping_list"));
              //füge einen boolean zu dem Ingredient das markiert ob dieser gekauft wurde
              item['isBought'] = false;
              item['amount'] = data.amount;
              item['origin'] = data.origin;
              item['transport'] = data.transport;
              //item['co2value'] = this.randomInt(10, 1500);

              //füge angeklicktes item zu liste dazu
              list.push(item);
              //überschreibe die Einkaufsliste im Local Storage mit der neuen Liste
              window.localStorage.setItem("shopping_list", JSON.stringify(list));
              //console.log(JSON.parse(window.localStorage.getItem("shopping_list"))[0].isBought);
              this.showToast(item);

              //this.makePostRequest({"hello" : 0});
            }
            else {
              let toast = this.toastCtrl.create({
                message: data.amount + ' ist keine Zahl. Bitte versuchen Sie es erneut.',
                duration: 3000,
                position: 'bottom',
              });
              toast.present();
            }
          }
        }
      ]
    });
    prompt.present();
  }

  /*  makePostRequest(message) {
  this.http.post("https://test.eaternity.ch/api/recipes?full-resource=true",
  JSON.stringify(message),
  {
  "headers": {
  'Authorization' : "Basic aDRjSzR0SDBOT2c3NUhqZkszMzlLbE9scGEzOWZKenhYdzo="
}
})
.subscribe(data => {
console.log("did it");
}, error => {
console.log(JSON.stringify(error.json()));
});
} */
}
