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
import { BookLabPage } from "../../pages/book-lab/book-lab";
// import { CompleteTestService } from '../../providers/complete-test-service/complete-test-service';
import { SuburbLocationService } from "../../providers/complete-test-service/suburb-location-service";

import { Http } from "@angular/http";
// // import { Keyboard } from '@ionic-native/keyboard';
import { MenuPage } from "../menu/menu";
import { Storage } from "@ionic/storage";

import "rxjs/add/operator/map";
import { IonicSelectableComponent } from "ionic-selectable";

@Component({
  selector: "page-lab-search",
  templateUrl: "lab-search.html",
})
export class LabSearchPage {
  @ViewChild("searchbar") myInput;
  @ViewChild("input")
  searchbar: any;
  public searchForm: any;
  messageList: any;
  api_code: any;
  location: any;
  displayData: any;
  check: any;
  from_menu: any = [];
  body: any;
  jsonBody: any;
  params: any = [];
  from_login: any = [];
  from_login2: any;
  from_login3: any;
  sub_id: any;
  string: any;

  countries: any;
  regions: any;
  cities: any;
  suburbs: any;
  surb;
  token;

  constructor(
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
    public _form: FormBuilder,
    public toastCtrl: ToastController
  ) {
    this.from_login = this.navParams.get("value");
    var results_body = JSON.parse(this.from_login);
    this.token = this.navParams.get("token");
    var user_id = results_body["data"]["user_infos"][0].user_id;

    console.log("VALUE IN TABS CONSTRUCTOR IS" + this.from_login);

    this.searchForm = this._form.group({
      city_id: ["", Validators.compose([Validators.required])],
      suburb_id: ["", Validators.compose([Validators.required])],
    });

    this.data.get_cities_by_region(this.token).then(
      (result) => {
        console.log(result);
        var jsonBody = result;
        // jsonBody = JSON.parse(jsonBody);
        this.cities = jsonBody["data"];

        console.log("Jsson body " + JSON.stringify(this.cities));
      },
      (err) => {
        console.log("error = " + JSON.stringify(err));
      }
    );
  }

  surburbChange(event: { component: IonicSelectableComponent; value: any }) {
    this.surb = event.value;
    console.log("Surburb Id:", this.surb.id);
    console.log("Surburb Name:", this.surb.name);
  }

  go() {
    let loader = this.loadingCtrl.create({
      content: "Please wait ...",
    });

    loader.present();

    let data = this.surb.name;
    console.log("LOCATION ENTERED " + data);

    if (data == undefined) {
      let alert = this.alertCtrl.create({
        title: "",
        subTitle:
          "Please enter your location.Your location should be on ghinger.",
        buttons: ["OK"],
      });
      alert.present();
      loader.dismiss();
    } else {
      this.navCtrl.push(BookLabPage, {
        value: data,
        another: this.from_login,
        sub_id: this.surb.id,
        token: this.token,
      });
      loader.dismiss();
    }
  }

  get_suburbs(city_id) {
    console.log("CITYYY ID " + JSON.stringify(city_id));
    if (city_id) {
      this.storage.set("city_id", city_id.id);

      console.log("city_id = " + JSON.stringify(city_id.id));

      setTimeout(() => {
        this.data.get_suburbs_by_city(city_id.id, this.token).then(
          (result) => {
            console.log(result);
            var jsonBody = result;
            this.suburbs = jsonBody["data"];
            // loading.dismiss();

            console.log("Jsson body " + JSON.stringify(this.suburbs));
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
