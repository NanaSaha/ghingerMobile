import { Component, ViewChild } from "@angular/core";
import {
  NavController,
  NavParams,
  ViewController,
  ToastController,
  LoadingController,
  AlertController,
  ModalController,
} from "ionic-angular";
import { DataProvider } from "../../providers/data/data";
import { CompleteTestService } from "../../providers/complete-test-service/complete-test-service";
// import { Keyboard } from '@ionic-native/keyboard';
import "rxjs/add/operator/map";
import { MedicationdetailsPage } from "../medicationdetails/medicationdetails";
import { VidConsultPage } from "../vid-consult/vid-consult";
import { VideoconsultdetailsPage } from "../videoconsultdetails/videoconsultdetails";
import { PhoneConsultPage } from "../phone-consult/phone-consult";
import { PrescriptionPage } from "../prescription/prescription";
import { PrescriptiondetailsPage } from "../prescriptiondetails/prescriptiondetails";
import { PhoneconsultdetailsPage } from "../phoneconsultdetails/phoneconsultdetails";
import { Storage } from "@ionic/storage";
import { BilldetailsPage } from "../billdetails/billdetails";

@Component({
  selector: "page-phoneconsulthistory",
  templateUrl: "phoneconsulthistory.html",
})
export class PhoneconsulthistoryPage {
  @ViewChild("searchbar") myInput;
  @ViewChild("input")
  // searchbar: any;
  messageList: any;
  api_code: any;
  location: any;
  displayData: any;
  check: any;
  from_menu: any = [];
  body: any;
  jsonBody: any;
  params: any = [];
  newparams: any;
  from_login: any = [];
  from_login2: any = [];
  from_login3: any = [];
  sub_id: any;
  string: any;

  requester_id1: any;
  from_login_doc: any = [];
  from_login_pers: any = [];
  body1: any;
  retrieve1: any;
  jsonBody1: any;

  body2: any;
  jsonBod2: any;
  appointmentType: any;

  // person_type3: any;

  phoneconsult_details: any = [];
  content: any = [];
  // items: any = [];
  // videoconsultappointmentdetails = { id: '' };
  rowid: any;

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
    console.log("We are in Phone Consult History page");
    this.from_login = this.navParams.get("value");

    this.from_login2 = this.navParams.get("pers_value");
    this.from_login3 = this.navParams.get("doc_value");
    this.appointmentType = this.navParams.get("appointmentType");

    console.log("this.appointmentType = " + this.appointmentType);

    console.log("VALUE IN TABS CONSTRUCTOR IS" + this.from_login);

    this.body = this.from_login; // this.body = Array.of(this.from_login);

    this.jsonBody = this.body; // this.jsonBody = JSON.parse(this.body);

    this.requester_id1 = this.jsonBody[0].id;
    // this.check = this.jsonBody[0];

    this.params = {
      requester_id: this.requester_id1,
      appointment_type_id: this.appointmentType,
    };

    this.newparams = JSON.stringify(this.params);

    // console.log("New params " + this.newparams);

    this.getPhoneConsultHistory();
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  // openNewAppointment(){
  //   //suppose to open the new medication appointment modal page
  //   this.navCtrl.push(MedicationSearchPage, {
  //     value: this.from_login, doc_value: this.from_login_doc, pers_value: this.from_login_pers
  //   });
  // }

  openNewAppointment() {
    let confirm = this.alertCtrl.create({
      title: "Phone Consultation",
      message:
        "Consultation Fee :: GHc 60. Do you please like to proceed to book the appointment?",
      buttons: [
        {
          text: "No",
          handler: () => {},
        },
        {
          text: "Yes",
          handler: () => {
            let loader = this.loadingCtrl.create({
              content: "Please Hold on...",
              duration: 1000,
            });

            loader.present();

            setTimeout(() => {
              this.navCtrl.push(VidConsultPage, {
                value: this.from_login,
                doc_value: this.from_login3,
                pers_value: this.from_login2,
                appointmentType: this.appointmentType,
              });
            }, 1000);

            setTimeout(() => {
              loader.dismiss();
            }, 800);
          },
        },
      ],
    });
    confirm.present();
  }

  getPhoneConsultHistory() {
    let loader = this.loadingCtrl.create({
      content: "Please wait ...",
    });

    loader.present();

    setTimeout(() => {
      this.jsonBody = JSON.parse(this.newparams);

      this.data.getPhoneConsultHistory(this.jsonBody).then(
        (result) => {
          // this.contacts = result;
          console.log(result);

          var jsonBody = result["_body"];
          jsonBody = JSON.parse(jsonBody);
          this.phoneconsult_details = jsonBody;
          loader.dismiss();

          console.log("Jsson body " + JSON.stringify(jsonBody));
        },
        (err) => {
          let alert = this.alertCtrl.create({
            title: "",
            subTitle: "An Error Occured. Please try again.",
            buttons: ["OK"],
          });
          alert.present();

          loader.dismiss();
          console.log(err);
        }
      );
    }, 1);
  }

  phone_consult_history_details(phoneconsult_history_id, appointmentType) {
    this.navCtrl.push(PhoneconsultdetailsPage, {
      value: this.from_login,
      doc_value: this.from_login_doc,
      pers_value: this.from_login_pers,
      phoneconsult_history_id: phoneconsult_history_id,
      appointmentType: appointmentType,
    });
    // rowid: rowid
  }

  public bill(data) {
    console.log(data);
    if (data) {
      this.storage.set("billdetails", JSON.stringify(data));
    } else {
      this.storage.set("billdetails", "empty");
    }
    this.navCtrl.push(BilldetailsPage, {
      value: this.from_login,
      doc_value: this.from_login_doc,
      pers_value: this.from_login_pers,
    });
  }
}
