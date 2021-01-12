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

    this.from_login2 = this.navParams.get("pers_value");
    this.from_login3 = this.navParams.get("doc_value");
    console.log("VALUE IN TABS CONSTRUCTOR IS" + this.from_login);

    this.searchForm = this._form.group({
      city_id: ["", Validators.compose([Validators.required])],
      suburb_id: ["", Validators.compose([Validators.required])],
    });

    this.data.get_cities_by_region().then(
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

  go() {
    let loader = this.loadingCtrl.create({
      content: "Please wait ...",
    });

    loader.present();

    let data = this.surb.suburb_name;

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
      this.params = {
        location: data,
      };
      console.log("PARAMETERS" + this.params);

      this.data.hospitals(this.params).then(
        (result) => {
          console.log("RESULTS IS " + result);
          console.log("RESULTS IS" + this.data.hospitals(this.params));
          var body = result["_body"];
          body = JSON.parse(body);
          this.check = body;
          console.log("RESULTS IS " + this.check);
          this.string = JSON.stringify(this.check);
          console.log("LETS SEE THE STRING " + this.string);

          this.jsonBody = JSON.parse(this.string);

          if (this.jsonBody[0]) {
            if (this.jsonBody[0].suburb_id) {
              this.sub_id = this.jsonBody[0].suburb_id;
              console.log("LETS SEE THE Surburb " + this.sub_id);
              if (this.sub_id) {
                this.storage.set("suburb_id", this.sub_id);
              }
            }
          }

          var desc = body["resp_desc"];
          var code = body["resp_code"];

          console.log(desc);
          console.log(code);

          this.messageList = desc;
          this.api_code = code;

          if (code == "119") {
            loader.dismiss();
            this.showalertmessage("Ghinger", desc);
          } else {
            console.log("VALUES FROM LOCATION SEARCH" + data);
            console.log(data);
            console.log("VALUES FROM LOCATION IN ID " + this.sub_id);

            loader.dismiss();

            this.navCtrl.push(HospitalListPage, {
              value: data,
              another: this.from_login,
              sub_id: this.sub_id,
              doc_value: this.from_login3,
              pers_value: this.from_login2,
            });
          }
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  get_suburbs(city_id) {
    if (city_id) {
      this.storage.set("city_id", city_id.id);

      console.log("city_id = " + JSON.stringify(city_id.id));

      setTimeout(() => {
        this.data.get_suburbs_by_city(city_id.id).then(
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
