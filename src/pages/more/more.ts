import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  AlertController,
  LoadingController,
  App,
} from "ionic-angular";
import { ReferalsPage } from "../referals/referals";

import { PaymentHistoryPage } from "../payment-history/payment-history";
import { SubscriptionHistoryPage } from "../subscription-history/subscription-history";
import { ContactPage } from "../contact/contact";
import { Storage } from "@ionic/storage";
import { LoginPage } from "../login/login";

@Component({
  selector: "page-more",
  templateUrl: "more.html",
})
export class MorePage {
  pages: Array<{
    title: string;
    component: any;
    feature: string;
    icon: string;
  }>;
  rootPage: any;

  user_details;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public app: App
  ) {
    this.pages = [
      {
        title: "Subscriptions History",
        component: SubscriptionHistoryPage,
        feature: "dev",
        icon: "",
      },
      {
        title: "Payment History",
        component: PaymentHistoryPage,
        feature: "dev",
        icon: "",
      },
      {
        title: "Referal Code",
        component: ReferalsPage,
        feature: "dev",
        icon: "",
      },
      {
        title: "Contact Ghinger",
        component: ContactPage,
        feature: "dev",
        icon: "",
      },

      { title: "Sign Out", component: null, feature: "done", icon: "" },
    ];

    this.storage.get("user_details").then((results) => {
      console.log("user_details from Storage in More Page = " + results);
      this.user_details = results;
    });
  }

  openPage(page) {
    if (page.component) {
      this.navCtrl.push(page.component, { user_details: this.user_details });
    } else {
      console.log(`feature = ${page.feature} AND title = ${page.title}`);
      if (page.feature) {
        if (page.feature == "dev") {
          this.showalertmessage_default(
            "Ghinger Health Care",
            "This feature is under development. Kindly check back soon."
          );
        } else {
          this.logout_func();
        }
      }
    }
  }

  logout_func() {
    // logout logic
    let confirm = this.alertCtrl.create({
      title: "Logout",
      message: "Do you wish to logout?",
      buttons: [
        {
          text: "No",
          handler: () => {},
        },
        {
          text: "Yes",
          handler: () => {
            let loader = this.loadingCtrl.create({
              content: "Logging out...",
              duration: 1000,
            });

            loader.present();

            setTimeout(() => {
              console.log("logging out in 1 second");
              this.storage.clear();
              var check_storage = this.storage.set("sliderShown", false);
              console.log("STORAGE STATUS " + check_storage);
              // this.navCtrl.setRoot(LoginPage);
              // this.rootPage = LoginPage;
              this.app.getRootNav().setRoot(LoginPage);
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

  showalertmessage_default(titlemsg, mainmsg) {
    let alert = this.alertCtrl.create({
      title: titlemsg,
      subTitle: mainmsg,
      buttons: ["OK"],
    });
    alert.present();
  }
}
