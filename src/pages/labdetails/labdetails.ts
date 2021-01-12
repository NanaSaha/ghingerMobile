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
  currentlabappointmentdetaildata = {
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

    console.log("LAB DETAILS " + JSON.stringify(this.lab_appoint_history));
    console.log("LAB APPOINTMENT ID " + this.lab_appoint_history.id);
    this.getCurrentLabDetails(this.lab_appoint_history);
    this.read_appointment(this.lab_appoint_history.id);

    this.getLabPreConfirmedDetails();

    this.params = {
      appointment_id: this.lab_appoint_history.id,
    };

    this.newparams = JSON.stringify(this.params);

    console.log("New params " + this.newparams);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad Lab appointment details Page");
  }

  getCurrentLabDetails(lab_appoint_history) {
    // console.log("lab_appoint_history_id = " + lab_appoint_history_id);
    this.jsonBody1 = Array.of(lab_appoint_history);
    console.log("JSON BODY" + this.jsonBody1);
    if (this.jsonBody1) {
      if (this.jsonBody1[0]) {
        //   this.currentlabappointmentdetaildata.id = data["id"];
        //this.currentlabappointmentdetaildata.location = this.jsonBody1[0].suburb_name;
        this.currentlabappointmentdetaildata.requestcategory = this.jsonBody1[0].category;
        this.currentlabappointmentdetaildata.beneficiary = this.jsonBody1[0].beneficiary_name;
        this.currentlabappointmentdetaildata.beneficiary_age = this.jsonBody1[0].beneficiary_age;

        if (this.jsonBody1[0].beneficiary_gender) {
          if (this.jsonBody1[0].beneficiary_gender == "F") {
            this.currentlabappointmentdetaildata.beneficiary_gender = "Female";
          } else if (this.jsonBody1[0].beneficiary_gender == "M") {
            this.currentlabappointmentdetaildata.beneficiary_gender = "Male";
          } else {
            this.currentlabappointmentdetaildata.beneficiary_gender = "";
          }
        }
        this.currentlabappointmentdetaildata.beneficiary_phone_number = this.jsonBody1[0].beneficiary_phone_number;
        this.currentlabappointmentdetaildata.requesturgency = this.jsonBody1[0].urgency;
        this.currentlabappointmentdetaildata.proposeddateandtime = this.jsonBody1[0].proposed_date;
        //this.currentlabappointmentdetaildata.proposeddateandtime = this.jsonBody1[0].test_list;

        if (this.jsonBody1[0].confirmed_date) {
          this.currentlabappointmentdetaildata.confirmed_date = this.jsonBody1[0].confirmed_date;
        }

        // this.currentlabappointmentdetaildata.created_at = this.jsonBody1[0].created_at;
        // this.currentlabappointmentdetaildata.complaint = this.jsonBody1[0].complaint_desc;

        this.currentlabappointmentdetaildata.test_list = this.jsonBody1[0].test_list;

        this.currentlabappointmentdetaildata.prevmedicalhistory = this.jsonBody1[0].prev_medical_history;
        this.currentlabappointmentdetaildata.allergies = this.jsonBody1[0].allergies;
        // this.currentlabappointmentdetaildata.medications = this.jsonBody1[0].medication;

        if (this.jsonBody1[0].src == "APP") {
          this.currentlabappointmentdetaildata.source = "Mobile App";
        } else {
          this.currentlabappointmentdetaildata.source = "Web Access";
        }

        if (this.jsonBody1[0].confirm_status == true) {
          this.currentlabappointmentdetaildata.confirmstatus = "Confirmed";
        } else {
          this.currentlabappointmentdetaildata.confirmstatus = "Not Confirmed";
        }

        this.currentlabappointmentdetaildata.image_name = this.jsonBody1[0].image_name;
        this.currentlabappointmentdetaildata.appointment_type_id = this.jsonBody1[0].appointment_type_id;
      }
    }
  }

  getLabPreConfirmedDetails() {
    let loading = this.loadingCtrl.create({
      content: "Please wait...",
    });

    loading.present();

    setTimeout(() => {
      this.jsonBody = JSON.parse(this.newparams);

      console;

      this.data.getLabPreConfirmed(this.jsonBody).then(
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
