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

@Component({
  selector: "page-specialist-history-details",
  templateUrl: "specialist-history-details.html",
})
export class SpecialistHistoryDetailsPage {
  currentmedappointmentdetail: any;
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
    beneficiary_age: "beneficiary_age",
    beneficiary_gender: "",
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
  specialist_appoint_history: any;
  confirmed_details;

  complaint_desc;
  comment;
  suburb_name;
  confirmed_date;
  api_code;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public data: DataProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController
  ) {
    this.specialist_appoint_history = navParams.get(
      "specialist_appoint_history"
    );

    console.log("MEDICAION APPOINTMENT ID " + this.specialist_appoint_history);

    this.getCurrentSpecialistDetails();
  }

  getCurrentSpecialistDetails() {
    let loading = this.loadingCtrl.create({
      content: "Please wait...",
    });

    loading.present();

    setTimeout(() => {
      this.data.getSpecialistPreConfirmed(this.specialist_appoint_history).then(
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

  showalertmessage(mainmsg) {
    let alert = this.alertCtrl.create({
      title: "Ghinger Health Care",
      subTitle: mainmsg,
      buttons: ["OK"],
    });
    alert.present();
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }
}
