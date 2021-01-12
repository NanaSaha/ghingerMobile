import { Component } from "@angular/core";
import {
  ToastController,
  LoadingController,
  AlertController,
} from "ionic-angular";
import { NavController, NavParams, MenuController } from "ionic-angular";
import { DataProvider } from "../../providers/data/data";
import { Storage } from "@ionic/storage";

@Component({
  selector: "page-payment-history",
  templateUrl: "payment-history.html",
})
export class PaymentHistoryPage {
  user_details;
  jsonBody: any;
  body: any;
  username: any;
  params: any;
  reg_id: any;
  user_type: any;
  from_login: any = [];

  mobile_number: any;

  params2: any;
  select: any;
  orders: any;
  paymentJson: any;
  order_id: any;
  list: any;
  list2: any;
  q: any;
  newparams: any;
  user_id;

  constructor(
    public alertCtrl: AlertController,
    public storage: Storage,
    public data: DataProvider,
    public loadingCtrl: LoadingController,
    public menuCtrl: MenuController,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.storage.get("value").then((value) => {
      this.user_details = value;
      console.log("this.user_details " + JSON.stringify(this.user_details));
      this.user_id = this.user_details[0].id;
      console.log("USER ID " + this.user_id);

      this.params = {
        user_id: this.user_id,
      };

      this.newparams = JSON.stringify(this.params);

      console.log("New params " + this.newparams);

      let loader = this.loadingCtrl.create({
        content: "Please wait ...",
      });

      loader.present();

      console.log(this.params);
      this.jsonBody = JSON.parse(this.newparams);

      this.data.payment_history(this.jsonBody).then(
        (result) => {
          console.log(result);

          this.paymentJson = JSON.stringify(result);

          console.log("LETS SEE THE PROCESS ORDER " + this.paymentJson);
          this.list = JSON.parse(this.paymentJson);

          console.log(result);

          var jsonBody = result["_body"];
          jsonBody = JSON.parse(jsonBody);
          this.list = jsonBody;

          loader.dismiss();
        },
        (err) => {
          loader.dismiss();
          let alert = this.alertCtrl.create({
            title: "",
            subTitle: "Sorry, cant connect right now. Please try again!",
            buttons: ["OK"],
          });
          alert.present();
        }
      );
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad PaymentHistoryPage");
  }
}
