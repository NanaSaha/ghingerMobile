
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { ToastController, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';

import { Http } from '@angular/http';
// import { Keyboard } from '@ionic-native/keyboard';
import 'rxjs/add/operator/map';

import { AddRegisPage } from '../add-regis/add-regis';
import { PatientDetailsPage } from '../patient-details/patient-details';
import { DocpagePersonalPage } from '../docpage-personal/docpage-personal';



@Component({
  selector: 'page-video-cons-list',
  templateUrl: 'video-cons-list.html',
})
export class VideoConsListPage {
   from_login: any = [];
  messageList: any;
  api_code: any;
  location: any;
  displayData: any;
  check: any;
  from_menu: any = [];
  body: any;
  jsonBody: any;
  params: any = [];

  doctor_id: any;
  data1: any = [];


  constructor(public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams, public data: DataProvider, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public modalCtrl: ModalController, public viewCtrl: ViewController) {
    this.check = this.navParams.get('value')
    console.log('VALUE IN PHONE CONS LIST CONSTRUCTOR IS' + this.check); 

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhoneConsListPage');
  }


    view(data){


    this.navCtrl.push(PatientDetailsPage, { 'value': this.check ,"user_data": data })
  }

}

