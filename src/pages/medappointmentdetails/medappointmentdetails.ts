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
import { CompleteTestService } from "../../providers/complete-test-service/complete-test-service";

import "rxjs/add/operator/map";

@Component({
  selector: "page-medappointmentdetails",
  templateUrl: "medappointmentdetails.html",
})
export class MedappointmentdetailsPage {
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
    beneficiary_phone_number: "",
    beneficiary_age: "",
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
  appointment: any;

  confirmed_details;
  complaint_desc;
  comment;
  suburb_name;
  confirmed_date;
  provider_name;
  api_code;

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
    this.appointment = navParams.get("medappointhistory");

    this.getCurrentMedAppointmentdetails(this.appointment);
    this.read_appointment(this.appointment.id);
    this.getMedicalPreConfirmedDetails();

    this.params = {
      appointment_id: this.appointment.id,
    };

    this.newparams = JSON.stringify(this.params);

    console.log("New params " + this.newparams);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad MedappointmentdetailsPage");
  }

  getCurrentMedAppointmentdetails(medappointhistory) {
    console.log("medappointhistory = " + JSON.stringify(medappointhistory));

    this.jsonBody1 = Array.of(medappointhistory);

    if (this.jsonBody1) {
      if (this.jsonBody1[0]) {
        this.currentmedappointmentdetaildata.location = this.jsonBody1[0].suburb_name;
        this.currentmedappointmentdetaildata.serviceprovider = this.jsonBody1[0].provider_name;
        this.currentmedappointmentdetaildata.requestcategory = this.jsonBody1[0].category;
        this.currentmedappointmentdetaildata.beneficiary = this.jsonBody1[0].beneficiary_name;
        this.currentmedappointmentdetaildata.beneficiary_phone_number = this.jsonBody1[0].beneficiary_phone_number;
        this.currentmedappointmentdetaildata.beneficiary_age = this.jsonBody1[0].beneficiary_age;

        // if (this.jsonBody1[0].beneficiary_gender) {
        //   if (this.jsonBody1[0].beneficiary_gender == "F") {
        //     this.currentmedappointmentdetaildata.beneficiary_gender = "Female";
        //   } else if (this.jsonBody1[0].beneficiary_gender == "M") {
        //     this.currentmedappointmentdetaildata.beneficiary_gender = "Male";
        //   } else {
        //     this.currentmedappointmentdetaildata.beneficiary_gender = "";
        //   }
        // }
        this.currentmedappointmentdetaildata.requesturgency = this.jsonBody1[0].urgency;
        this.currentmedappointmentdetaildata.proposeddateandtime = this.jsonBody1[0].proposed_date;
        this.currentmedappointmentdetaildata.confirmed_date = this.jsonBody1[0].confirmed_date;
        this.currentmedappointmentdetaildata.complaint = this.jsonBody1[0].complaint_desc;
        this.currentmedappointmentdetaildata.prevmedicalhistory = this.jsonBody1[0].prev_medical_history;
        this.currentmedappointmentdetaildata.allergies = this.jsonBody1[0].allergies;

        if (this.jsonBody1[0].src == "APP") {
          this.currentmedappointmentdetaildata.source = "Mobile App";
        }

        if (this.jsonBody1[0].confirm_status == true) {
          this.currentmedappointmentdetaildata.confirmstatus = "Confirmed";
        } else {
          this.currentmedappointmentdetaildata.confirmstatus = "Not Confirmed";
        }
      }
    }
  }

  getMedicalPreConfirmedDetails() {
    let loading = this.loadingCtrl.create({
      content: "Please wait...",
    });

    loading.present();

    setTimeout(() => {
      this.jsonBody = JSON.parse(this.newparams);

      console;

      this.data.getMedicalPreConfirmed(this.jsonBody).then(
        (result) => {
          // this.contacts = result;
          console.log(result);

          var jsonBody = result["_body"];
          console.log(jsonBody);

          jsonBody = JSON.parse(jsonBody);
          console.log(jsonBody);

          var desc = jsonBody["resp_desc"];
          var code = jsonBody["resp_code"];

          console.log(desc);
          console.log(code);
          this.api_code = code;

          if (this.api_code != "119") {
            if (this.jsonBody) {
              this.confirmed_details = jsonBody;
              console.log("CONFRIM DETAIL " + this.confirmed_details);
              console.log("SUBURD " + this.confirmed_details[0].suburb_name);
              this.suburb_name = this.confirmed_details[0].suburb_name;
              this.complaint_desc = this.confirmed_details[0].complaint_desc;
              this.comment = this.confirmed_details[0].comment;
              this.confirmed_date = this.confirmed_details[0].confirmed_date;
              this.provider_name = this.confirmed_details[0].provider_name;
              console.log(
                "provider_name " + this.confirmed_details[0].provider_name
              );
            } else {
              this.confirmed_details = "0";
            }
          }
          loading.dismiss();

          console.log("Jsson body " + jsonBody);
          console.log("Jsson body " + JSON.stringify(jsonBody));
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
