import { Component, ViewChild } from "@angular/core";
import { NavController, NavParams, ViewController } from "ionic-angular";
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
// // import { Keyboard } from '@ionic-native/keyboard';
import "rxjs/add/operator/map";
import { LabimagesPage } from "../labimages/labimages";

// @IonicPage()
@Component({
  selector: "page-labdetails",
  templateUrl: "labdetails.html",
})
export class LabdetailsPage {
  currentlabappointmentdetail: any;
  currentvidappointmentdetaildata = {
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
    beneficiary_age: "",
    beneficiary_gender: "",
    test_list: "",
    confirmed_date: "",
    image_name: "",
    appointment_type_id: "",
  };
  params: any = [];
  newparams: any;
  appointment_id: any;
  jsonBody: any;
  body: any;
  retrieve1: string;
  body1: any;
  jsonBody1: any;
  lab_appoint_history: any;
  confirmed_details;
  complaint_desc;
  comment;
  suburb_name;
  confirmed_date;
  api_code;
  token;

  constructor(
    // private keyboard: Keyboard,
    public navCtrl: NavController,
    public navParams: NavParams,
    public completeTestService: CompleteTestService,
    public data: DataProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController
  ) {
    this.lab_appoint_history = navParams.get("lab_appoint_history");
    this.token = this.navParams.get("token");

    this.getCurrentLabDetails();
  }

  getCurrentLabDetails() {
    let loading = this.loadingCtrl.create({
      content: "Please wait...",
    });

    loading.present();

    setTimeout(() => {
      console;

      this.data.getLabPreConfirmed(this.lab_appoint_history, this.token).then(
        (result) => {
          let results = result["data"];

          console.log("LEST SEE DATA COMING FOR DETAILS---::--", results);
          console.log("COMPLAINTS---::--", results.complaint);

          this.currentvidappointmentdetaildata.complaint = results.complaint;
          this.currentvidappointmentdetaildata.prevmedicalhistory =
            results.prev_history;
          this.currentvidappointmentdetaildata.allergies = results.allergies;

          this.currentvidappointmentdetaildata.proposeddateandtime =
            results.proposed_date;
          this.currentvidappointmentdetaildata.confirmstatus =
            results.confirm_status;

          loading.dismiss();
        },
        (err) => {
          loading.dismiss();
          this.showalertmessage(
            "Sorry. An Error occured. Kindly refresh and try again."
          );
          console.log("error = " + JSON.stringify(err));
        }
      );
    }, 1);
  }

  read_appointment(data) {
    this.params = { appointment_id: data };

    this.data.read_appointment(this.params).then((result) => {});
  }

  show_appointment_image(data) {
    //show image in a modal view
    this.navCtrl.push(LabimagesPage, { appointment_details: data });
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
