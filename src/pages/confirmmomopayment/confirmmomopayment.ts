import { Component, ViewChild } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController,
} from "ionic-angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  ToastController,
  LoadingController,
  AlertController,
  ModalController,
} from "ionic-angular";
import { DataProvider } from "../../providers/data/data";
import { CompleteTestService } from "../../providers/complete-test-service/complete-test-service";
import "rxjs/add/operator/map";
import { Storage } from "@ionic/storage";
import { MenuPage } from "../menu/menu";

@Component({
  selector: "page-confirmmomopayment",
  templateUrl: "confirmmomopayment.html",
})
export class ConfirmmomopaymentPage {
  public paymentForm: any;
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
  bill_appointment_title: string;
  bill_amount: string;
  appointment_title: string;
  bill_amount_words: string;
  billing_info_id: string;
  sender_network_long: string;
  phone_number: string;
  sender_network: string;
  voucher_code: string;
  Val: any;
  bill_voucher_code: string;
  email: any;
  from_login: any = [];
  mobile_number: any;
  customer_number;
  nw;
  amount;
  subscription_id;
  user_id;

  constructor(
    // private keyboard: Keyboard,
    public navCtrl: NavController,
    public navParams: NavParams,
    public _form: FormBuilder,
    public completeTestService: CompleteTestService,
    public data: DataProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    public storage: Storage
  ) {
    this.customer_number = this.navParams.get("customer_number");
    this.nw = this.navParams.get("nw");
    this.amount = this.navParams.get("amount");
    this.voucher_code = this.navParams.get("voucher_code");
    this.subscription_id = this.navParams.get("subscription_id");
    this.user_id = this.navParams.get("user_id");

    console.log("subscription_id " + this.subscription_id);
    console.log("user_id " + this.user_id);

    this.storage.get("value").then((value) => {
      this.from_login = value;
      this.email = this.from_login[0].email;
      this.mobile_number = this.from_login[0].mobile_number;
      console.log("confirmmomopayments EMAIL = " + this.email);
      console.log("confirmmomopayments mobile_number = " + this.mobile_number);
    });

    this.paymentForm = this._form.group({
      patient_name: ["", Validators.compose([Validators.required])],
      // bill_appointment_title: ["", Validators.compose([Validators.required])],

      nw: ["", Validators.compose([Validators.required])],
      voucher_code: [
        "",
        ExtraValidators.conditional(
          (group) => group.controls.telco.value == "VOD",
          Validators.compose([
            Validators.minLength(6),
            Validators.maxLength(6),
            Validators.pattern("^[0-9]+$"),
            Validators.required,
          ])
        ),
      ],
      amount: [this.bill_amount, Validators.compose([Validators.required])],
    });
  }

  ionViewWillEnter() {
    this.storage.get("patient_name").then((patient_name) => {
      this.patient_name = patient_name;
      console.log(`confirmmomopayments patient_name = ${this.patient_name}`);
    });

    this.storage
      .get("bill_appointment_title")
      .then((bill_appointment_title) => {
        this.bill_appointment_title = bill_appointment_title;
        console.log(
          `confirmmomopayments bill_appointment_title = ${this.bill_appointment_title}`
        );
      });

    this.storage.get("bill_amount").then((bill_amount) => {
      this.bill_amount = bill_amount;
      console.log(`confirmmomopayments bill_amount = ${this.bill_amount}`);
    });

    this.storage.get("appointment_title").then((appointment_title) => {
      this.appointment_title = appointment_title;
      console.log(
        `confirmmomopayments appointment_title = ${this.appointment_title}`
      );
    });

    this.storage.get("bill_amount_words").then((bill_amount_words) => {
      this.bill_amount_words = bill_amount_words;
      console.log(
        `confirmmomopayments bill_amount_words = ${this.bill_amount_words}`
      );
    });

    this.storage.get("billing_info_id").then((billing_info_id) => {
      this.billing_info_id = billing_info_id;
      console.log(
        `confirmmomopayments billing_info_id = ${this.billing_info_id}`
      );
    });

    this.storage.get("bill_phone_number").then((bill_phone_number) => {
      this.phone_number = bill_phone_number;
      console.log(
        `confirmmomopayments bill_phone_number = ${this.phone_number}`
      );
    });

    this.storage.get("bill_sender_network").then((bill_sender_network) => {
      this.sender_network = bill_sender_network;
      console.log(
        `confirmmomopayments sender_network = ${this.sender_network}`
      );
    });

    this.storage
      .get("bill_sender_network_long")
      .then((bill_sender_network_long) => {
        this.sender_network_long = bill_sender_network_long;
        console.log(
          `confirmmomopayments sender_network_long = ${this.sender_network_long}`
        );
      });

    this.storage.get("bill_voucher_code").then((bill_voucher_code) => {
      this.voucher_code = bill_voucher_code;
      console.log(`confirmmomopayments voucher_code = ${this.voucher_code}`);
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad Medication appointment details Page");
  }

  confirmmomopayment() {
    let confirm = this.alertCtrl.create({
      title: "Ghinger Health Care",
      message: `Are you sure you want to make this payment?`,
      buttons: [
        { text: "No", handler: () => {} },
        {
          text: "Yes",
          handler: () => {
            setTimeout(() => {
              this.payment_func();
            }, 1);
          },
        },
      ],
    });
    confirm.present();
  }

  payment_func() {
    let loading = this.loadingCtrl.create({
      content: "Please wait...",
    });

    loading.present();

    setTimeout(() => {
      this.params = {
        subscription_id: this.subscription_id,
        customer_number: this.customer_number,
        nw: this.nw,
        amount: this.amount,
        voucher_code: this.voucher_code,
        user_id: this.user_id,
      };

      this.Val = JSON.stringify(this.params);
      this.jsonBody = JSON.parse(this.Val);
      console.log("THIS IS the book appointment values " + this.Val);

      this.data.make_payment(this.jsonBody).then(
        (result) => {
          console.log("make_payment_url RESULT = " + result["body"]);
          this.body = result["_body"];
          console.log(this.body);

          this.body = JSON.parse(this.body);

          loading.dismiss();

          if (this.body) {
            if (this.body.resp_code) {
              if (this.body.resp_code == "000") {
                let alert = this.alertCtrl.create({
                  title: "Ghinger Health Care",
                  subTitle: this.body.resp_desc,
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
              } else {
                this.showalertmessage(this.body.resp_desc);
              }
            }
          }
        },
        (err) => {
          loading.dismiss();
          this.showalertmessage(
            "Financial Platform having some issues currently and will be resolved quickly. Kindly try again later"
          );
          console.log(err);
        }
      );
    }, 1);
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

export class ExtraValidators {
  static conditional(conditional, validator) {
    return function (control) {
      revalidateOnChanges(control);

      if (control && control._parent) {
        if (conditional(control._parent)) {
          return validator(control);
        }
      }
    };
  }
}

function revalidateOnChanges(control): void {
  if (control && control._parent && !control._revalidateOnChanges) {
    control._revalidateOnChanges = true;
    control._parent.valueChanges
      .distinctUntilChanged((a, b) => {
        // These will always be plain objects coming from the form, do a simple comparison
        if ((a && !b) || (!a && b)) {
          return false;
        } else if (a && b && Object.keys(a).length !== Object.keys(b).length) {
          return false;
        } else if (a && b) {
          for (let i in a) {
            if (a[i] !== b[i]) {
              return false;
            }
          }
        }
        return true;
      })
      .subscribe(() => {
        control.updateValueAndValidity();
      });

    control.updateValueAndValidity();
  }
  return;
}
