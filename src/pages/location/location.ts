import { Component, ViewChild } from "@angular/core";
import { NavController, NavParams, ViewController } from "ionic-angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  ToastController,
  LoadingController,
  AlertController,
  ModalController,
} from "ionic-angular";
import { DataProvider } from "../../providers/data/data";
import { HospitalListPage } from "../hospital-list/hospital-list";
import { HospitalList1Page } from "../hospital-list1/hospital-list1";
import { BookDoctorPage } from "../../pages/book-doctor/book-doctor";
import { PersonalWelPage } from "../../pages/personal-wel/personal-wel";
import { SuburbLocationService } from "../../providers/complete-test-service/suburb-location-service";
import { Http } from "@angular/http";
// import { Keyboard } from '@ionic-native/keyboard';
import "rxjs/add/operator/map";
import { MenuPage } from "../menu/menu";
import { Storage } from "@ionic/storage";
import { IonicSelectableComponent } from "ionic-selectable";

@Component({
  selector: "page-location",
  templateUrl: "location.html",
})
export class LocationPage {
  @ViewChild("searchbar") myInput;
  @ViewChild("input")
  searchbar: any;

  public personalDocLocationForm: any;
  messageList: any;
  api_code: any;
  location: any;
  displayData: any;
  check: any;
  from_menu: any = [];
  body: any;
  jsonBody: any;
  params: any = [];
  params2: any = [];
  from_login: any = [];
  from_login2: any = [];
  from_login3: any = [];
  sub_id: any;
  string: any;
  yesorno: any;
  doc_name: any;
  prev_medical_history: any;
  requester_id: any;
  countries: any;
  regions: any;
  cities: any;
  suburbs: any;
  surb;
  token;

  constructor(
    public toastCtrl: ToastController,
    // private keyboard: Keyboard,
    public navCtrl: NavController,
    public navParams: NavParams,
    public SuburbLocationService: SuburbLocationService,
    public data: DataProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    public storage: Storage,
    public _form: FormBuilder
  ) {
    this.from_login = this.navParams.get("value");
    this.from_login2 = this.navParams.get("pers_value");
    this.from_login3 = this.navParams.get("doc_value");
    this.storage.get("token").then((token) => {
      this.token = token;
      console.log("TOKEN IN MENu " + this.token);
    });
    console.log("LOGIN DETAILS IN MENU PAGE CONSTRUCTOR IS" + this.from_login);
    console.log(
      "LOGIN DETAILS from LOGIN DOC IN MENU PAGE FOR CONSTRUCTOR IS" +
        this.from_login2
    );
    console.log("LOGIN DETAILS IN MENU PAGE CONSTRUCTOR IS" + this.from_login3);

    this.personalDocLocationForm = this._form.group({
      city_id: ["", Validators.compose([Validators.required])],
      suburb_id: [""],
      prev_medical_history: [""],
      yesorno: ["", Validators.compose([Validators.required])],
      doc_name: [""],
    });

    this.storage.get("requester_id").then((requester_id) => {
      this.requester_id = requester_id;
      console.log(" requester_id requester_id = " + requester_id);
    });

    this.data.get_cities_by_region(this.token).then(
      (result) => {
        console.log(result);
        var jsonBody = result["_body"];
        jsonBody = JSON.parse(jsonBody);
        this.cities = jsonBody;

        console.log("Jsson body " + JSON.stringify(jsonBody));
      },
      (err) => {
        console.log("error = " + JSON.stringify(err));
      }
    );
  }

  surburbChange(event: { component: IonicSelectableComponent; value: any }) {
    this.surb = event.value;
    console.log("Surburb Id:", this.surb.id);
    console.log("Surburb Name:", this.surb.suburb_name);
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  go() {
    let loader = this.loadingCtrl.create({
      content: "Please wait ...",
    });

    loader.present();

    let data = this.surb.suburb_name;
    console.log("LOCATION ENTERED " + data);

    if (data == "") {
      let alert = this.alertCtrl.create({
        title: "",
        subTitle: "Please enter a location",
        buttons: ["OK"],
      });
      alert.present();
      loader.dismiss();
    } else {
      this.navCtrl.push(BookDoctorPage, {
        value: data,
        another: this.from_login,
        sub_id: this.surb.id,
        doc_value: this.from_login3,
        pers_value: this.from_login2,
      });
      loader.dismiss();
    }
  }

  submit() {
    this.from_login = this.navParams.get("value");
    console.log(
      "VALUE IN TABS CONSTRUCTOR IS" + JSON.stringify(this.from_login)
    );

    console.log(
      "LETS SEE YESORNO " + this.personalDocLocationForm.value.yesorno
    );
    console.log(
      "LETS SEE YESORNO " + this.personalDocLocationForm.value.doc_name
    );
    let data = this.surb.suburb_name;
    console.log("LOCATION ENTERED " + data);
    console.log("THIS IS THE REquester ID " + this.requester_id);
    console.log("THIS IS THE suburb_id ID " + this.sub_id);

    // let data = this.searchbar.getValue()

    this.params2 = {
      suburb_name: data,
      appointment_type_id: "PD",
      requester_id: this.requester_id,
      has_pd: this.personalDocLocationForm.value.yesorno,
      pd_name: this.personalDocLocationForm.value.doc_name,
      prev_medical_history: this.prev_medical_history,
    };

    //I'm sending the suburb name cos I currently don't have the suburb_id. Nornamlly, I would have to now search the suburb_masters table for the id based
    //on the name and return before passing the id. But I would rather pass the suburb_name then in the endpoint I rather get the id and finally do the inserting.
    //this will be faster on the server side compared to doing a round trip here.

    console.log("LETS SEE ALL THE PARAMS " + JSON.stringify(this.params2));

    let loader = this.loadingCtrl.create({
      content: "Please wait ...",
    });

    loader.present();

    this.data.doc_appointment(this.params2).then(
      (result) => {
        console.log("THIS IS THE RESULT" + result);
        var jsonBody = result["_body"];
        console.log(jsonBody);

        jsonBody = JSON.parse(jsonBody);
        console.log(jsonBody);

        var desc = jsonBody["resp_desc"];
        var code = jsonBody["resp_code"];

        console.log(desc);
        console.log(code);

        this.messageList = desc;
        this.api_code = code;

        loader.dismiss();

        if (this.api_code == "000") {
          let alert = this.alertCtrl.create({
            title: "",
            subTitle: this.messageList,
            buttons: ["OK"],
          });
          alert.present();
        }
        // this.viewCtrl.dismiss();
        //this.navCtrl.setRoot(MenuPage, { 'value': this.from_login,'pers_value': this.from_login2,'doc_value': this.from_login3 });
        this.navCtrl.pop();

        if (this.api_code == "555") {
          let alert = this.alertCtrl.create({
            title: "",
            subTitle: this.messageList,
            buttons: ["OK"],
          });

          alert.present();
        }
      },
      (err) => {
        loader.dismiss();
        this.toastCtrl
          .create({
            message: "Could not process this request successfully.",
            duration: 5000,
          })
          .present();

        console.log(err);
      }
    );
  }

  get_suburbs(city_id) {
    if (city_id) {
      this.storage.set("city_id", city_id.id);

      console.log("city_id = " + JSON.stringify(city_id.id));

      setTimeout(() => {
        this.data.get_suburbs_by_city(city_id.id, this.token).then(
          (result) => {
            console.log(result);
            var jsonBody = result["_body"];
            jsonBody = JSON.parse(jsonBody);
            this.suburbs = jsonBody;
            // loading.dismiss();

            console.log("Jsson body " + JSON.stringify(jsonBody));
          },
          (err) => {
            // loading.dismiss();
            this.showalertmessage(
              "Ghinger",
              "Sorry. An Error occured. Kindly refresh and try again."
            );
            this.showmessage(
              "Sorry. An Error occured. Kindly refresh and try again."
            );
            console.log("error = " + JSON.stringify(err));
          }
        );
      }, 1);
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

  home() {
    this.navCtrl.setRoot(MenuPage);
  }
}
