import { Component, ViewChild } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController,
} from "ionic-angular";
import {
  ToastController,
  LoadingController,
  AlertController,
  ModalController,
} from "ionic-angular";
import { DataProvider } from "../../providers/data/data";
// import { Search2Page } from '../search2/search2';
// import { SearchPage } from '../search/search';
import { CompleteTestService } from "../../providers/complete-test-service/complete-test-service";
// import { Keyboard } from '@ionic-native/keyboard';
import "rxjs/add/operator/map";
import { Storage } from "@ionic/storage";
import { MomopaymentPage } from "../momopayment/momopayment";

@Component({
  selector: "page-paymentoption",
  templateUrl: "paymentoption.html",
})
export class PaymentoptionPage {
  currentmedappointmentdetail: any;
  currentmedappointmentdetaildata = {
    id: 0,
    location: "",
    serviceprovider: "",
    requestcategory: "",
    beneficiary: "",
    requesturgency: "",
    proposeddateandtime: "",
    complaint: "",
    prevmedicalhistory: "",
    allergies: "",
    source: "",
    confirmstatus: "",
    medications: "",
    created_at: "",
    beneficiary_phone_number: "",
    beneficiary_age: "beneficiary_age",
    beneficiary_gender: "",
    confirmed_date: "",
  };
  params: any = [];
  newparams: any;
  appointment_id: any;
  jsonBody: any;
  body: any;
  retrieve1: string;
  body1: any;
  jsonBody1: any;
  medication_appoint_history: any;
  billdetails: any;
  my_params: any;
  bill_details: any;
  new_bill_d: any;
  item_total = 0.0;
  final_item_total: string;
  patient_billing_infos_id: string;
  paid_status: string;
  patient_name: string;
  appointment_type_title: string;
  from_login;
  from_params;
  subscription_id;
  amount

   public public_key = 'pk_live_df632ae19ef3c4f2f59aa10572d7b80b954c03e1'; //Put your paystack Test or Live Key here
  public channels = ['bank', 'card', 'ussd', 'qr','mobile_money']; //Paystack Payment Methods
  public random_id = Math.floor(Date.now() / 1000); //Line to generate reference number




  constructor(
    // private keyboard: Keyboard,
    public navCtrl: NavController,
    public navParams: NavParams,
    public completeTestService: CompleteTestService,
    public data: DataProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    public storage: Storage
  ) {
    this.from_login = this.navParams.get("value");
    this.from_params = this.navParams.get("params");
    this.subscription_id = this.navParams.get("subscription_id");

    console.log("PARAMS " + this.from_params);
    this.amount = this.from_params;
    
    console.log("AMOUNT FROM PARAMS " + this.amount);
  }

  

  public cardpaymentmethod() {
    this.showalertmessage(
      "This feature is under development. Kindly check back soon."
    );
  }

  public paymentmethod(payment_type) {
    this.navCtrl.push(MomopaymentPage, {
      value: this.from_login,
      params: this.from_params,
      payment_type: payment_type,
      subscription_id: this.subscription_id,
    });
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  showalertmessage(mainmsg) {
    let alert = this.alertCtrl.create({
      title: "Ghinger Health Care",
      subTitle: mainmsg,
      buttons: ["OK"],
    });
    alert.present();
  }
}
