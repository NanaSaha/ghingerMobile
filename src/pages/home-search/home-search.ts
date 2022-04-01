import { Component, ViewChild } from "@angular/core";
import { NavController, NavParams, ViewController } from "ionic-angular";
import {
  ToastController,
  LoadingController,
  AlertController,
  ModalController,
} from "ionic-angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DataProvider } from "../../providers/data/data";
import { HospitalListPage } from "../hospital-list/hospital-list";
import { HospitalList1Page } from "../hospital-list1/hospital-list1";
import { BookHomePage } from "../../pages/book-home/book-home";
// import { CompleteTestService } from '../../providers/complete-test-service/complete-test-service';
import { SuburbLocationService } from "../../providers/complete-test-service/suburb-location-service";
import { Http } from "@angular/http";
import { Storage } from "@ionic/storage";
// // import { Keyboard } from '@ionic-native/keyboard';
import "rxjs/add/operator/map";
import { IonicSelectableComponent } from "ionic-selectable";
import { MenuPage } from "../menu/menu";

@Component({
  selector: "page-home-search",
  templateUrl: "home-search.html",
})
export class HomeSearchPage {
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
  from_login2: any = [];
  from_login3: any = [];
  sub_id: any;
  string: any;
  appointmentType: any;

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
    public _form: FormBuilder,
    public toastCtrl: ToastController,
    public storage: Storage
  ) {
    this.from_login = this.navParams.get("value");
    this.token = this.navParams.get("token");
    var results_body = JSON.parse(this.from_login);
    var user_id = results_body["data"]["user_infos"][0].user_id;

    this.searchForm = this._form.group({
      // "country_id": ["", Validators.compose([Validators.required])],
      // "region_id": ["", Validators.compose([Validators.required])],
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
      this.navCtrl.push(BookHomePage, {
        value: data,
        another: this.from_login,
        sub_id: this.surb.id,
        token: this.token,

        appointmentType: this.appointmentType,
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

  home() {
    this.navCtrl.setRoot(MenuPage);
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
