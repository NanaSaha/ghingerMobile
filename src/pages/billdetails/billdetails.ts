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
import { PaymentoptionPage } from "../paymentoption/paymentoption";

@Component({
  selector: "page-billdetails",
  templateUrl: "billdetails.html",
})
export class BilldetailsPage {
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

  constructor(
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

    this.medication_appoint_history = navParams.get(
      "medication_appoint_history"
    );

    this.storage.get("patient_name").then((patient_name) => {
      this.patient_name = patient_name;
    });

    this.storage.get("billdetails").then((billdetails) => {
      this.billdetails = billdetails;
      var bill_info_id = JSON.parse(this.billdetails);
      console.log(
        `bill_info_id.billing_info_bill_items_info_id = ${bill_info_id.billing_info_bill_items_info_id}, bill_info_id.confirmed_appointment_id = ${bill_info_id.confirmed_appointment_id}, bill_info_id.appointment_type_id = ${bill_info_id.appointment_type_id},bill_info_id.req_urgency_ref = ${bill_info_id.req_urgency_ref}`
      );
      this.getBillDetails(
        bill_info_id.billing_info_bill_items_info_id,
        bill_info_id.confirmed_appointment_id,
        bill_info_id.appointment_type_id,
        bill_info_id.req_urgency_ref
      );

      this.appointment_type_title = bill_info_id.appointment_type_title;
      this.storage.set("bill_appointment_title", this.appointment_type_title);

      if (bill_info_id.paid) {
        if (bill_info_id.paid == true) {
          this.paid_status = "Paid";
        } else {
          this.paid_status = "Not Paid";
        }
      } else {
        this.paid_status = "Not Paid";
      }

      console.log(
        "Bill DETAILS from LOGIN DOC IN MENU PAGE FOR CONSTRUCTOR IS" +
          this.billdetails
      );
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad Medication appointment details Page");
  }

  getBillDetails(
    data,
    confirmed_appointment_id,
    appointment_type_id,
    req_urgency_ref
  ) {
    let loading = this.loadingCtrl.create({
      content: "Please wait...",
    });

    loading.present();

    this.my_params = {
      bill_info_id: data,
      confirmed_appointment_id: confirmed_appointment_id,
      appointment_type_id: appointment_type_id,
      req_urgency_ref: req_urgency_ref,
    };

    setTimeout(() => {
      this.jsonBody = JSON.stringify(this.my_params);
      console.log("LETS SEE THE Get Bill details VAL " + this.jsonBody);
      this.jsonBody = JSON.parse(this.jsonBody);

      this.data.get_bill_details(this.jsonBody).then(
        (result) => {
          console.log(
            `getAppointmentHistory result = ${JSON.stringify(
              result["_body"]
            )} AND result["resp_code"] = ${result["resp_code"]}`
          );

          console.log(result);
          var jsonBody = result["_body"];
          console.log(jsonBody);

          jsonBody = JSON.parse(jsonBody);
          console.log(jsonBody);

          var desc = "";
          var code = "";

          console.log(desc);
          console.log(code);

          loading.dismiss();

          if (jsonBody) {
            if (jsonBody["resp_code"]) {
              code = jsonBody["resp_code"];
              desc = jsonBody["resp_desc"];
              if (code == "119") {
                this.showalertmessage(jsonBody["resp_desc"]);
              }
            } else {
              this.bill_details = jsonBody;
              this.new_bill_d = this.bill_details;
              this.patient_billing_infos_id = this.new_bill_d[0].patient_billing_infos_id;
              console.log(
                `this.patient_billing_infos_id = ${this.patient_billing_infos_id}`
              );

              this.new_bill_d.forEach((element) => {
                console.log(
                  `element.item_price = ${
                    element.item_price
                  }, parseFloat(element.item_price) = ${parseFloat(
                    element.item_price
                  )}, this.item_total = ${this.item_total}}`
                );
                this.item_total =
                  this.item_total + parseFloat(element.item_price);
              });
              this.final_item_total = "GH¢ " + this.item_total.toFixed(2);
              console.log(`this.item_total = ${this.item_total.toFixed(2)}`);
            }
          }
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
    // }
  }

  acceptbill(patient_billing_infos_id) {
    this.storage.set("billing_info_id", patient_billing_infos_id);
    this.action_bill_func(patient_billing_infos_id, "A");

    let confirm = this.alertCtrl.create({
      title: "Ghinger Health Care",
      message: `Do you wish to proceed with the payment of ${this.final_item_total}?`,
      buttons: [
        { text: "No", handler: () => {} },
        {
          text: "Yes",
          handler: () => {
            setTimeout(() => {
              this.storage.set("bill_amount_words", this.final_item_total);
              this.storage.set("bill_amount", this.item_total);
              this.navCtrl.push(PaymentoptionPage, {
                value: this.from_login,
                params: this.item_total.toFixed(2),
                subscription_id: "",
              });
            }, 1);
          },
        },
      ],
    });
    confirm.present();
  }

  // value: this.from_login,
  // params: this.item_total.toFixed(2),
  // subscription_id: this.subscription_id,

  action_bill_func(patient_billing_infos_id, action) {
    let loader = this.loadingCtrl.create({
      content: "Please wait ...",
    });

    loader.present();

    this.my_params = {
      patient_billing_infos_id: patient_billing_infos_id,
      action: action,
    };

    this.jsonBody = JSON.stringify(this.my_params);
    console.log("LETS SEE THE Get Bill details VAL " + this.jsonBody);
    this.jsonBody = JSON.parse(this.jsonBody);

    this.data.accept_or_reject_bill(this.jsonBody).then((result) => {
      console.log(
        `accept_or_reject_bill_url result = ${JSON.stringify(
          result
        )} AND result["resp_code"] = ${result["resp_code"]}`
      );

      console.log("accept_or_reject_bill_url - THIS IS THE RESULT" + result);
      var jsonBody = result["_body"];
      console.log(jsonBody);

      jsonBody = JSON.parse(jsonBody);
      var desc = jsonBody["resp_desc"];
      var code = jsonBody["resp_code"];
      // this.appointment_id = jsonBody["appointment_id"];

      console.log(desc);
      console.log(code);

      loader.dismiss();

      if (jsonBody["resp_code"] == "000") {
        let alert = this.alertCtrl.create({
          title: "Ghinger Health Care",
          subTitle: jsonBody["resp_desc"],
          buttons: [
            {
              text: "OK",
              handler: () => {
                this.navCtrl.pop();
              },
            },
          ],
        });
        alert.present();
      } else {
        this.showalertmessage(jsonBody["resp_desc"]);
      }

      return;
    });
  }

  rejectbill(patient_billing_infos_id) {
    this.storage.set("billing_info_id", patient_billing_infos_id);

    let confirm = this.alertCtrl.create({
      title: "Ghinger Health Care",
      message: `Are you sure you want to reject this bill?`,
      buttons: [
        { text: "No", handler: () => {} },
        {
          text: "Yes",
          handler: () => {
            setTimeout(() => {
              this.action_bill_func(patient_billing_infos_id, "R");
            }, 1);
          },
        },
      ],
    });
    confirm.present();
  }

  getCurrentMedicationDetails(medication_appoint_history) {
    let loading = this.loadingCtrl.create({
      content: "Please wait...",
    });

    loading.present();

    this.jsonBody1 = Array.of(medication_appoint_history);

    // loading.dismiss();

    if (this.jsonBody1) {
      if (this.jsonBody1[0]) {
        //   this.currentmedappointmentdetaildata.id = data["id"];
        this.currentmedappointmentdetaildata.location = this.jsonBody1[0].suburb_name;
        this.currentmedappointmentdetaildata.requestcategory = this.jsonBody1[0].category;
        this.currentmedappointmentdetaildata.beneficiary = this.jsonBody1[0].beneficiary_name;
        this.currentmedappointmentdetaildata.beneficiary_phone_number = this.jsonBody1[0].beneficiary_phone_number;
        this.currentmedappointmentdetaildata.beneficiary_age = this.jsonBody1[0].beneficiary_age;

        if (this.jsonBody1[0].beneficiary_gender) {
          if (this.jsonBody1[0].beneficiary_gender == "F") {
            this.currentmedappointmentdetaildata.beneficiary_gender = "Female";
          } else if (this.jsonBody1[0].beneficiary_gender == "M") {
            this.currentmedappointmentdetaildata.beneficiary_gender = "Male";
          } else {
            this.currentmedappointmentdetaildata.beneficiary_gender = "";
          }
        }
        // this.currentmedappointmentdetaildata.beneficiary_gender = this.jsonBody1[0].beneficiary_gender;

        this.currentmedappointmentdetaildata.requesturgency = this.jsonBody1[0].urgency;
        this.currentmedappointmentdetaildata.created_at = this.jsonBody1[0].created_at;
        this.currentmedappointmentdetaildata.confirmed_date = this.jsonBody1[0].confirmed_date;
        this.currentmedappointmentdetaildata.complaint = this.jsonBody1[0].complaint_desc;
        this.currentmedappointmentdetaildata.prevmedicalhistory = this.jsonBody1[0].prev_medical_history;
        this.currentmedappointmentdetaildata.allergies = this.jsonBody1[0].allergies;
        this.currentmedappointmentdetaildata.medications = this.jsonBody1[0].medication;

        if (this.jsonBody1[0].src == "APP") {
          this.currentmedappointmentdetaildata.source = "Mobile App";
        }

        if (this.jsonBody1[0].confirm_status == true) {
          this.currentmedappointmentdetaildata.confirmstatus = "Confirmed";
        } else {
          this.currentmedappointmentdetaildata.confirmstatus = "Not Confirmed";
        }

        loading.dismiss();
      }
    }
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
