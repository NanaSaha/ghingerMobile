import { Component } from '@angular/core';
import { NavController, NavParams,ViewController } from 'ionic-angular';


@Component({
  selector: 'page-personal-modal',
  templateUrl: 'personal-modal.html',
})
export class PersonalModalPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonalModalPage');
  }

   closeModal() {



    this.viewCtrl.dismiss();

  }


}
