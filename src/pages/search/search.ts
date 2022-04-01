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
import { SuburbLocationService } from "../../providers/complete-test-service/suburb-location-service";

import { Http } from "@angular/http";
import { Storage } from "@ionic/storage";
import "rxjs/add/operator/map";
import { IonicSelectableComponent } from "ionic-selectable";
import { MenuPage } from "../menu/menu";

@Component({
  selector: "page-search",
  templateUrl: "search.html",
})
export class SearchPage {
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

  countries: any;
  regions: any;
  cities: any;
  suburbs: any;
  surb;
  token;

  constructor(
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
    this.token = this.navParams.get("token");
    var results_body = JSON.parse(this.from_login);
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

    let data = this.surb.id;

    if (data == undefined) {
      let alert = this.alertCtrl.create({
        title: "",
        subTitle:
          "Please enter your location.Your location should be on Ghinger.",
        buttons: ["OK"],
      });
      alert.present();
      loader.dismiss();
    } else {
      this.data.hospitals(this.surb.id).then(
        (result) => {
          console.log("RESULTS IS " + result);
          var string_results = JSON.stringify(result);
          console.log("SUBSCRIPTION HISTORY RESULTS " + string_results);

          let hospital_data = result["data"];
          console.log("HOSPITAL DATA " + hospital_data);

          // this.jsonBody = JSON.parse(this.string);

          // if (this.jsonBody[0]) {
          //   if (this.jsonBody[0].suburb_id) {
          //     this.sub_id = this.jsonBody[0].suburb_id;
          //     console.log("LETS SEE THE Surburb " + this.sub_id);
          //     if (this.sub_id) {
          //       this.storage.set("suburb_id", this.sub_id);
          //     }
          //   }
          // }

          // if (code == "119") {
          //   loader.dismiss();
          //   this.showalertmessage("Ghinger", desc);
          // } else {
          //   console.log("VALUES FROM LOCATION SEARCH" + data);
          //   console.log(data);
          //   console.log("VALUES FROM LOCATION IN ID " + this.sub_id);

          loader.dismiss();

          this.navCtrl.push(HospitalListPage, {
            value: hospital_data,
            another: this.from_login,
            sub_id: this.surb.id,
            sub_name: this.surb.name,
            token: this.token,
          });
        },
        (err) => {
          console.log(err);
          this.showalertmessage(
            "Ooops",
            "Something went wrong. Please try again"
          );
        }
      );
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
