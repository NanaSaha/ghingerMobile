import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MenuPage } from "../menu/menu";
import {
  ToastController,
  LoadingController,
  AlertController,
  ModalController,
} from "ionic-angular";


@Component({
  selector: 'page-specialist-details',
  templateUrl: 'specialist-details.html',
})
export class SpecialistDetailsPage {

   public public_key = 'pk_live_df632ae19ef3c4f2f59aa10572d7b80b954c03e1'; //Put your paystack Test or Live Key here
  public channels = ['bank', 'card', 'ussd', 'qr','mobile_money']; //Paystack Payment Methods
  public random_id = Math.floor(Date.now() / 1000); //Line to generate reference number

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SpecialistDetailsPage');
  }


    paymentDone(ref: any) {
    console.log(ref) //ref contains the response from paystack after successful payment



    let alert = this.alertCtrl.create({
                  title: "Ghinger Health Care",
                  subTitle: "Payment Successful",
                  buttons: [
                    {
                      text: "OK",
                      handler: () => {
                        this.navCtrl.setRoot(MenuPage);
                      },
                    },
                  ],
                });
                alert.present();
    
  }

  //Event triggered if User cancel the payment
  paymentCancel() {
    console.log('gateway closed')
   
  }
} 
