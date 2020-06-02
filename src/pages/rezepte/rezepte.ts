import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { Rezeptansicht } from '../rezeptansicht/rezeptansicht';

@Component({
  selector: 'page-rezepte',
  templateUrl: 'rezepte.html'
})
export class Rezepte {
  recipes = [];
  foundRecipes = [];
  ingredient_CsC = [];
  ingredients_HOC = [];
  ingredients_Pizza = [];
  ingredients_Pommes = [];
  ingredients_birne = [];

  score: number;
  level2: number;
  level3: number;
  level4: number;
  level5: number;
  missingPoints = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {

    this.level2 = parseInt(window.localStorage.getItem("level2"));
    this.level3 = parseInt(window.localStorage.getItem("level3"));
    this.level4 = parseInt(window.localStorage.getItem("level4"));
    this.level5 = parseInt(window.localStorage.getItem("level5"));

    this.score = parseInt(window.localStorage.getItem("score"));

    this.ingredient_CsC = [
      {id: 9, title: 'Karotten', amount: 70, co2value: 305},
      {id: 23, title: 'Peperoni', amount: 150, co2value: 7008},
      {id: 10, title: 'Zwiebeln', amount: 80, co2value: 365},
      {id: 11, title: 'Knoblauch', amount: 5, co2value: 1170},
      {id: 12, title: 'Champignons', amount: 60, co2value: 2790},
      {id: 14, title: 'Räuchertofu', amount: 175, co2value: 783},
      {id: 24, title: 'Tofu', amount: 175, co2value: 1008},
      {id: 13, title: 'Kidneybohnen', amount: 250, co2value: 1302},
      {id: 25, title: 'Süssmais', amount: 150, co2value: 839},
      {id: 15, title: 'Tomaten', amount: 500, co2value: 547},
      {id: 26, title: 'Soja Sauce', amount: 10, co2value: 1633},
      {id: 27, title: 'Zitronensaft', amount: 10, co2value: 1953},
      {id: 28, title: 'Essig', amount: 5, co2value: 3203},
      {id: 29, title: 'Senf', amount: 5, co2value: 1003},
      {id: 30, title: 'Chili', amount: 5, co2value: 8243},
      {id: 31, title: 'Salz', amount: 2, co2value: 603},
      {id: 32, title: 'Pfeffer', amount: 2, co2value: 603},
      {id: 33, title: 'Oregano', amount: 2, co2value: 8016},
      {id: 34, title: 'Basilikum', amount: 2, co2value: 8016}
    ];

    this.ingredients_HOC = [
      {id: 16, title: 'Hokkaido', amount: 750, co2value: 354},
      {id: 17, title: 'Kartoffeln', amount: 750, co2value: 170},
      {id: 18, title: 'Orangen', amount: 400, co2value: 486},
      {id: 11, title: 'Knoblauch', amount: 16, co2value: 1170},
      {id: 35, title: 'Ingwer', amount: 20, co2value: 603},
      {id: 36, title: 'Kurkuma (getrocknet)', amount: 4, co2value: 3723},
      {id: 37, title: 'Koriander (getrocknet)', amount: 8, co2value: 3733},
      {id: 38, title: 'Zucker', amount: 15, co2value: 335},
      {id: 39, title: 'Salz', amount: 2, co2value: 603},
      {id: 40, title: 'Kokosnussmilch', amount: 400, co2value: 1527},
      {id: 41, title: 'Wasser', amount: 100, co2value: 16}
    ];

    this.ingredients_Pizza = [
      {id: 0, title: 'Wasser', amount: 320, co2value: 16},
      {id: 19, title: 'Zucker', amount: 15, co2value: 335},
      {id: 20, title: 'Hefe', amount: 20, co2value: 1037},
      {id: 21, title: 'Weissmehl', amount: 600, co2value: 517},
      {id: 22, title: 'Salz', amount: 10, co2value: 603},
      {id: 42, title: 'Zwiebeln', amount: 70, co2value: 365},
      {id: 43, title: 'Karotten', amount: 100, co2value: 305},
      {id: 44, title: 'Knoblauch', amount: 3, co2value:1170},
      {id: 45, title: 'Feta', amount: 200, co2value: 3546},
      {id: 46, title: 'Feigen', amount: 100, co2value: 8236},
      {id: 47, title: 'Petersilie (frisch)', amount: 45, co2value: 8096},
      {id: 48, title: 'Zimt (getrocknet)', amount: 2, co2value: 8106},
      {id: 49, title: 'Koriander (getrocknet)', amount: 2, co2value: 3733},
      {id: 50, title: 'Kreuzkümmel (getrocknet)', amount: 2, co2value: 603},
      {id: 51, title: 'Curry (getrocknet)', amount: 5, co2value: 603},
      {id: 52, title: 'Chili (getrocknet)', amount: 2, co2value: 8246},
      {id: 53, title: 'Olivenöl', amount: 30, co2value: 3712},
      {id: 54, title: 'Wein', amount: 20, co2value: 1431},
      {id: 55, title: 'Tomatenkonzentrat (dreifach konzentriert)', amount: 40, co2value: 1743},
      {id: 56, title: 'Tomatenmark', amount: 400, co2value: 1003}
    ];

    this.ingredients_Pommes = [
      {id: 57, title: 'Süsskartoffeln', amount: 200, co2value: 653},
      {id: 58, title: 'Rapsöl', amount: 30, co2value: 1606},
      {id: 59, title: 'Italienische Kräuter', amount: 10, co2value: 603},
      {id: 60, title: 'Salz', amount: 2, co2value: 603},
      {id: 61, title: 'Pfeffer (getrocknet)', amount: 2, co2value: 603},
      {id: 62, title: 'Chili (getrocknet)', amount: 2, co2value: 8246},
      {id: 63, title: 'Paprika (edelsüss)', amount: 1, co2value: 603}
    ];

    this.ingredients_birne = [
      {id: 64, title: 'Birne', amount: 350, co2value: 286},
      {id: 65, title: 'Zucker', amount: 200, co2value: 335},
      {id: 66, title: 'Wasser', amount: 500, co2value: 16},
      {id: 67, title: 'Zitrone', amount: 85, co2value: 486},
      {id: 68, title: 'Zimt (getrocknet)', amount: 15, co2value: 8106},
      {id: 69, title: 'Nelken (getrocknet)', amount: 5, co2value: 1214},
      {id: 70, title: 'Schokolade (dunkel)', amount: 60, co2value: 2403},
      {id: 71, title: 'Spirituosen', amount: 10, co2value: 4103},
      {id: 72, title: 'Orangensaft', amount: 10, co2value: 1203}
    ];
    //Kategorien: schnell, einfach, schick, gemerkt
    this.recipes = [
      //http://app.eaternity.org/#!menu:7c5bd3c2-66a5-41f3-bd66-c35d40e8f4ae&customer=Eaternity&scope=PUBLIC
      { id: 0, title: 'Chili sin Carne', imageUrl: 'file:///android_asset/www/assets/img/0.jpg', category: 'einfach', co2: 497, recipeIngredients: this.ingredient_CsC,
      method: 'Die Zwiebel und Karotte in einer großen Pfanne anbraten. Den Tofu zerbröseln und hinzugeben und knusprig anbraten. Mit Sojasauce, Chili und Pfeffer würzen. Das restliche Gemüse dazugeben und für wenige Minuten anbraten lassen. Nun die Tomaten und Kidneybohnen dazugeben und ein paar Minuten köcheln lassen. Mit 1 TL Senf, etwas Essig und Zitronensaft, Salz und Kräutern abschmecken. Umrühren, einen Moment köcheln lassen und das Chili sin Carne heiß servieren. Als Garnitur passen Basilikumblätter und Kürbiskerne.'},
      //http://app.eaternity.org/#!menu:4bd47d15-89eb-4e0f-b142-4aed8299d40c&customer=Eaternity&scope=PUBLIC
      { id: 1, title: 'Hokkaidō-Orangen Curry', imageUrl: 'file:///android_asset/www/assets/img/1.jpg', category: 'schick', co2: 233, recipeIngredients: this.ingredients_HOC,
      method: 'Die Kartoffeln waschen, schälen und in 2 cm Würfel schneiden. Den Kürbis waschen, halbieren, entkernen und gegebenenfalls schälen. In 2 cm Würfel schneiden. Die Orangen schälen und in 1 cm Würfel schneiden. Knoblauch und Ingwer hacken. Gewürze und Flüssigkeiten abmessen und bereitstellen.Den Ofen auf 180° Grad vorheizen. Kokosnussmilch mit Wasser, Ingwer, Knoblauch und den Gewürzen vermengen. Den Kürbis, Kartoffeln und Orangen in eine Auflaufform füllen. Die Gewürz-Kokosmilch darüber verteilen. Gut mischen und 30-40 Minuten im Ofen backen. Tipp: Dazu passt ein blumiger Basmatireis.'},
      //http://app.eaternity.org/#!menu:ba34fba3-7135-4701-b8c4-ee43842cc9ad&customer=Eaternity&scope=PUBLIC
      { id: 2, title: 'Orientalische Pizza mit Feigen, Feta und Zwiebeln', imageUrl: 'file:///android_asset/www/assets/img/2.jpg', category: 'schick', co2: 408, recipeIngredients: this.ingredients_Pizza,
      method: 'Wasser, Zucker und Hefe zusammen mischen. Weissmehl und Salz abwägen und in eine Schüssel geben. Wasser-Hefemischung mit der Mehlmischung zu einem Pizzateig  kneten. Den Teig gehen lassen bis die anderen Zutaten bereit sind. Eine Zwiebeln und die Karotten mit Olivenöl andünsten. Die Gewürze dazugeben und mitdünsten. Tomatenpüree beigeben und mitanziehen. Mit Rotwein ablöschen und einreduzieren lassen. Tomatenmark beigeben und 20 min kochen lassen. Tomatensauce vom Herd nehmen und etwas auskühlen lassen. Den Teig auswallen und auf das Backpapier legen. Die ausgekühlte Sauce auf dem Teig verteilen. Den Feta und die Zwiebelringe über der Pizza verteilen. Bei 220° Grad 12 min backen. Mit Petersilie bestreuen.'},
      //http://app.eaternity.org/#!menu:42f27cd4-d35f-462a-bc03-fab8b3a6f1ae&customer=Eaternity&scope=PUBLIC
      { id: 3, title: 'Süßkartoffel-Pommes', imageUrl: 'file:///android_asset/www/assets/img/3.jpg', category: 'einfach', co2: 238, recipeIngredients: this.ingredients_Pommes,
      method: 'Die Süßkartoffeln schälen und in 1 cm dicke Spalten oder Scheiben schneiden. Den Ofen auf 200 Grad vorheizen. In einer Schüssel die Kräuter und Gewüze mit dem Öl vermischen. Die Kartoffelspalten mit der Gewürz-Ölmischung mischen, sodass jede Kartoffel gleichmäßig mit der Marinade benetzt ist. Auf einem Backblech mit Backpapier verteilen und etwa 25 bis 30 Min. knusprig backen.'},
      //http://app.eaternity.org/#!menu:75a6bd49-3fb6-497c-b539-0250d0663c7c&customer=Eaternity&scope=PUBLIC
      { id: 4, title: 'Weihnachtsbirne mit Schokoladesauce', imageUrl: 'file:///android_asset/www/assets/img/4.jpg', category: 'schick', co2: 138, recipeIngredients: this.ingredients_birne,
      method: 'Das Wasser aufkochen und die Zitrone, Zucker, Zimtstange und Nelken zugeben. Fünf Minuten köcheln. Die Birnen im Sud 15 Minuten pochieren. Die Schokolade „au-bain-marie“ schmelzen. Mit etwas Rum oder Orangensaft vermischen. Die Birnen kurz abtropfen lassen und danach mit der Schokolade anrichten.'}
      //http://app.eaternity.org/#!menu:9db6366d-f56b-4924-a7b9-69ec33ed17f2&customer=Eaternity&scope=PUBLIC
  /*    { id: 5, title: 'Erbsensuppe mit Minze', imageUrl: '../assets/img/5.jpg', category: 'schnell', co2: 165},
      //http://app.eaternity.org/#!menu:2d9e98bc-025b-44e8-910d-7beabdfbdcd3&customer=Eaternity&scope=PUBLIC
      { id: 6, title: 'Frischer zitroniger Kartoffelsalat ', imageUrl: '../assets/img/6.jpg', category: 'schnell', co2: 261},
      //http://app.eaternity.org/#!menu:75aa52f1-d9aa-4d45-9702-4663a74c0c89&customer=Eaternity&scope=PUBLIC
      { id: 7, title: 'Kürbis-Apfel Gulasch', imageUrl: '../assets/img/7.jpg', category: 'schnell', co2: 413}    */
    ];

    this.foundRecipes = this.recipes;
    window.localStorage.setItem("recipe_list", JSON.stringify(this.recipes));
  }

  itemTapped(event, item) {
    this.navCtrl.push(Rezepte, {
      item: item
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

  search(searchEvent) {
    let term = searchEvent.target.value.toLowerCase();
    this.foundRecipes = [];
    console.log(this.recipes);
    if (term != "") {
      this.foundRecipes = this.recipes.filter((i) => {
        if (i.title.toLowerCase().indexOf(term) == 0) {
          return true;
        }
        else {
          return false;
        }
      });
    }
  }

  openRecipe(recipe) {
    this.navCtrl.push(Rezeptansicht, {recipe});
  }
}
