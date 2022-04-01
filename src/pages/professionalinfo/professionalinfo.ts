import { Component, ViewChild } from "@angular/core";
import {
  NavController,
  NavParams,
  ViewController,
  Events,
} from "ionic-angular";
import { LoginPage } from "../login/login";
import {
  ToastController,
  LoadingController,
  AlertController,
  ModalController,
} from "ionic-angular";
// import { CompleteTestService } from '../../providers/complete-test-service/complete-test-service';
import { SuburbLocationService } from "../../providers/complete-test-service/suburb-location-service";
import { DataProvider } from "../../providers/data/data";
import { DoctorPage } from "../doctor/doctor";
import { Http } from "@angular/http";
// import { Keyboard } from '@ionic-native/keyboard';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Storage } from "@ionic/storage";
import { IonicSelectableComponent } from "ionic-selectable";
import { DoctorHomePage } from "../doctorhome/doctorhome";

import "rxjs/add/operator/map";

@Component({
  selector: "page-professionalinfo",
  templateUrl: "professionalinfo.html",
})
export class ProfessionalInfoPage {
  @ViewChild("searchbar") myInput;
  @ViewChild("input")
  searchbar: any;
  public professionalInfoForm: any;
  submitAttempt: boolean = false;
  messageList: any;
  api_code: any;
  signupVal: any;
  jsonBody: any;

  location: any;
  displayData: any;
  check: any;
  from_menu: any = [];
  from_regis_id: any = [];
  body: any;

  params: any = [];
  params2: any = [];
  from_login: any = [];
  sub_id: any;
  string: any;
  surburb_id: any;
  registration_number: any;
  registration_board: any;
  specialty: any;
  specialty_name: any;
  id: any;
  hospital_name: any;
  has_specialty: any;
  specialty_duration: any;
  license_number: any;
  medical_regulator: any;
  foreign_training: any;
  foreign_medical_regulator: any;
  foreign_license_number: any;
  // has_foriegn_training: any;
  body1: any;
  jsonBody1: any;
  jsonBody2: any;
  body2: any;
  regid: any;
  user_type1: any;

  countries: any;
  regions: any;
  cities: any;
  suburbs: any;
  surb;
  token;
  doc_details;
  account_id;

  constructor(
    public toastCtrl: ToastController,
    // private keyboard: Keyboard,
    public navCtrl: NavController,
    public navParams: NavParams,
    public _form: FormBuilder,
    public SuburbLocationService: SuburbLocationService,
    public data: DataProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    public storage: Storage
  ) {
    this.regid = this.navParams.get("regid");
    this.user_type1 = this.navParams.get("user_type1");
    this.doc_details = this.navParams.get("value");

    console.log("USER TYPE IS " + this.user_type1);
    console.log("DOC DETAILS " + this.doc_details);
    console.log("DOC DETAILS STRING" + JSON.stringify(this.doc_details));
    // this.account_id = JSON.parse(this.doc_details).data.id;
    this.account_id = this.regid;
    console.log("Account ID::" + JSON.stringify(this.account_id));

    this.cities = [
      {
        id: "9b0219c4-a090-4727-a65d-1f63292b1805",
        name: "Accra",
      },

      {
        id: "7b2d0d01-8fd1-40b5-99fc-b5ade79fb485",
        name: "Takoradi",
      },
      {
        id: "d6559b4b-119a-4127-9779-328ef12bf18e",
        name: "Tema",
      },
      {
        id: "4bc68633-a6c2-4efa-a2f4-d416e5054a22",
        name: "koforidua",
      },
    ];

    // this.storage.get("token").then((token) => {
    //   this.token = token;
    //   console.log("TOKEN IN MENu " + this.token);

    // this.data.get_cities_by_region(this.token).then(
    //   (result) => {
    //     console.log(result);
    //     var jsonBody = result;

    //     this.cities = jsonBody["data"];

    //     console.log("Jsson body " + JSON.stringify(this.cities));
    //   },
    //   (err) => {
    //     console.log("error = " + JSON.stringify(err));
    //   }
    // );
    // });

    // this.regid = 3;

    this.professionalInfoForm = this._form.group({
      // user_type1: [this.user_type1, Validators.compose([Validators.required])],
      city_id: [""],
      suburb_id: [""],
      hospital: ["", Validators.compose([Validators.required])],
      specialty: ["", Validators.compose([Validators.required])],
      specialty_duration: ["", Validators.compose([Validators.required])],
      license_number: ["", Validators.compose([Validators.required])],
      medical_regulator: ["", Validators.compose([Validators.required])],
      has_foreign_training: ["", Validators.compose([Validators.required])],
    });

    // this.getProfessional_groups();
    // this.getSpecialties();
  }

  surburbChange(event: { component: IonicSelectableComponent; value: any }) {
    this.surb = event.value;
    console.log("Surburb Id:", this.surb.id);
    console.log("Surburb Name:", this.surb.name);
  }

  signup() {
    let loader = this.loadingCtrl.create({
      content: "Please wait ...",
    });

    loader.present();

    let data = this.surb.name;
    console.log("LOCATION ENTERED " + data);

    this.params2 = {
      account_id: this.account_id,
      hospital: this.professionalInfoForm.value.hospital,
      suburb_id: this.professionalInfoForm.value.suburb_id.id,
      specialty: this.professionalInfoForm.value.specialty,
      specialty_duration: this.professionalInfoForm.value.specialty_duration,
      license_number: this.professionalInfoForm.value.license_number,
      medical_regulator: this.professionalInfoForm.value.medical_regulator,
      has_foreign_training: this.professionalInfoForm.value.foreign_training,
    };

    //     {
    //     "hospital": "DD",
    //     "account_id": "de9f6833-d1c0-4954-b46e-60a969f2c127",
    //     "suburb_id": "5b04c3bb-b1e1-4689-bb3f-a5d40c922478",
    //     "specialty": "heheh",
    //     "medical_regulator": "GMA",
    //     "specialty_duration": 4,
    //     "license_number": "dkjUHHKK",
    //     "has_foreign_training": false
    // }
    loader.dismiss();
    console.log(
      "THIS IS THE SURBURB ID::::" +
        JSON.stringify(this.professionalInfoForm.value.suburb_id.id)
    );

    console.log(
      "THIS IS THE STRINGIFY SIGNUP VALUES" + JSON.stringify(this.params2)
    );
    console.log("THIS IS THE SIGNUP VALUES" + this.params2);

    let alert = this.alertCtrl.create({
      title: "Profile Successfully Created..",
      subTitle: "Kindly Login with credentials created",
      buttons: [
        {
          text: "OK",
          handler: () => {
            this.navCtrl.setRoot(LoginPage);
          },
        },
      ],
    });
    alert.present();

    // this.data.update_registration(this.params2, this.token).then(
    //   (result) => {
    //     console.log("THIS IS THE RESULT" + result);

    //     let loader = this.loadingCtrl.create({
    //       content: "Submitting...",
    //     });
    //     loader.present();

    //     let alert = this.alertCtrl.create({
    //       title: "",
    //       subTitle: "Profile Successfully Created..",
    //       buttons: [
    //         {
    //           text: "OK",
    //           handler: () => {

    //             this.navCtrl.setRoot(DoctorHomePage, {
    //               value: this.doc_details,
    //               token: this.token,
    //             });
    //           },
    //         },
    //       ],
    //     });
    //     alert.present();

    //     setTimeout(() => {
    //       loader.dismiss();
    //     }, 1);
    //   },
    //   (err) => {
    //     let alert = this.alertCtrl.create({
    //       title: "",
    //       subTitle:
    //         "Registration unsuccessful. Please ensure that all details provided are correct and try again.",
    //       buttons: ["OK"],
    //     });
    //     alert.present();

    //     console.log(err);
    //   }
    // );
  }

  getSpecialties() {
    this.data.get_specialties().then(
      (result) => {
        console.log("Result = " + result);
        var body = result["_body"];
        console.log('result["_body"] = ' + body);

        body = JSON.parse(body);

        this.jsonBody = JSON.stringify(body);
        console.log("jsonBody = " + this.jsonBody);

        this.body1 = Array.of(this.jsonBody);
        this.jsonBody1 = JSON.parse(this.body1);

        console.log(
          "specialty id= " +
            this.jsonBody1[0].id +
            " title = " +
            this.jsonBody1[0].title
        );
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getProfessional_groups() {
    this.data.get_professional_groups().then(
      (result) => {
        console.log("get professional groups Result = " + result);
        var body2 = result["_body"];
        console.log('result["_body"] = ' + body2);

        body2 = JSON.parse(body2);

        this.jsonBody2 = JSON.stringify(body2);
        console.log("jsonBody = " + this.jsonBody2);

        this.body2 = Array.of(this.jsonBody2);
        this.jsonBody2 = JSON.parse(this.body2);
        // this.person_type1 = this.jsonBody1[0].surname

        console.log(
          "Professional group id= " +
            this.jsonBody2[0].id +
            " title = " +
            this.jsonBody2[0].group_name
        );
      },
      (err) => {
        console.log(err);
      }
    );
  }

  public doRefresh(refresher) {
    setTimeout(() => {
      this.Refresh();

      refresher.complete();
    }, 1);
  }

  public Refresh() {
    // setTimeout(() => {

    let loader = this.loadingCtrl.create({ content: "" });
    loader.present();

    // this.getcountries();
    this.getProfessional_groups();
    this.getSpecialties();

    loader.dismiss();
    // }, 1);
  }

  get_suburbs(city_id) {
    console.log("CITYYY ID " + JSON.stringify(city_id));
    console.log("TOKEN IN SURBURBS " + this.token);
    if (city_id) {
      this.storage.set("city_id", city_id.id);

      console.log("city_id = " + JSON.stringify(city_id.id));

      this.suburbs = [
        {
          id: "9b0219c4-a090-4727-a65d-1f63292b1805",
          name: "Dansoman",
        },

        {
          id: "7b2d0d01-8fd1-40b5-99fc-b5ade79fb485",
          name: "Lapaz",
        },
        {
          id: "d6559b4b-119a-4127-9779-328ef12bf18e",
          name: "Sowutuom",
        },
        {
          id: "4bc68633-a6c2-4efa-a2f4-d416e5054a22",
          name: "Kwashieman",
        },
      ];

      // setTimeout(() => {
      //   this.data.get_suburbs_by_city(city_id.id, this.token).then(
      //     (result) => {
      //       console.log(result);
      //       var jsonBody = result;
      //       this.suburbs = jsonBody["data"];
      //       // loading.dismiss();

      //       console.log("Jsson body " + JSON.stringify(this.suburbs));
      //     },
      //     (err) => {
      //       // loading.dismiss();
      //       this.showalertmessage(
      //         "Ghinger",
      //         "Sorry. An Error occured. Kindly refresh and try again."
      //       );
      //       this.showmessage(
      //         "Sorry. An Error occured. Kindly refresh and try again."
      //       );
      //       console.log("error = " + JSON.stringify(err));
      //     }
      //   );
      // }, 1);
    }
  }

  showmessage(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: "top",
    });
    toast.present();
  }

  showalertmessage(titlemsg, mainmsg) {
    let alert = this.alertCtrl.create({
      title: titlemsg,
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
