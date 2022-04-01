import { Component } from "@angular/core";
import { NavController, NavParams, AlertController } from "ionic-angular";
import { Storage } from "@ionic/storage";
import { ToastController, LoadingController } from "ionic-angular";
import { DataProvider } from "../../providers/data/data";

@Component({
  selector: "page-medicalrecord",
  templateUrl: "medicalrecord.html",
})
export class MedicalrecordPage {
  token;
  pdata;
  idd;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public storage: Storage,
    public toastCtrl: ToastController,
    public data: DataProvider,

    public loadingCtrl: LoadingController
  ) {
    this.storage.get("token").then((token) => {
      this.token = token;
      console.log("TOKEN IN MENu " + this.token);
      this.getRecord(this.token);
    });
  }

  getRecord(token) {
    console.log("TOKEN IN REC " + this.token);
    let loading = this.loadingCtrl.create({
      content: "Please wait...",
    });
    loading.present();
    setTimeout(() => {
      this.data.getMedRecords(token).then(
        (result) => {
          console.log("THIS IS THE RESULT" + result);
          var results_body = result;

          console.log(result);
          console.log("REVIEW RESULTS BODY " + results_body);

          var code = results_body["code"];
          this.pdata = results_body["data"];

          this.idd = JSON.stringify(this.pdata.id);

          console.log("LOGIN CODE " + code);
          console.log("data CODE " + this.pdata);
          console.log("data CODE ID" + this.idd);

          loading.dismiss();
        },
        (err) => {
          loading.dismiss();

          this.toastCtrl
            .create({
              message: "No Medical Record found",
              duration: 5000,
            })
            .present();
          // loader.dismiss();
          console.log("error = " + JSON.stringify(err));
        }
      );
    }, 1);
  }

  medicalRecord() {
    const prompt = this.alertCtrl.create({
      title: "Access Medical Record",
      message: "Enter your password to have access to your medical records",
      inputs: [
        {
          name: "Password",
          placeholder: "Password",
        },
      ],
      buttons: [
        {
          text: "Cancel",
          handler: (data) => {
            console.log("Cancel clicked");
          },
        },
        {
          text: "Submit",
          handler: (data) => {
            console.log("Saved clicked");
            this.navCtrl.push(MedicalrecordPage);
          },
        },
      ],
    });
    prompt.present();
  }

  toggleSection(i) {
    console.log("Lets see I", i);
    this.pdata[i].open = !this.pdata[i].open;
  }
}
