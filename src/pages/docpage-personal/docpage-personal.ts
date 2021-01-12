import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-docpage-personal',
  templateUrl: 'docpage-personal.html',
})
export class DocpagePersonalPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DocpagePersonalPage');
  }

}
