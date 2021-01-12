import { Component, ViewChild } from "@angular/core";
import { MenuController, Events, Nav, Platform, MenuType } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
// import { Keyboard } from '@ionic-native/keyboard';

//import { TabsPage } from '../pages/tabs/tabs';
import { BookMedPage } from "../pages/book-med/book-med";
import { LoginPage } from "../pages/login/login";
import { HomePage } from "../pages/home/home";
import { AboutPage } from "../pages/about/about";
import { ReferalsPage } from "../pages/referals/referals";

// import { TabsPage } from "../pages/tabs/tabs";
import { MenuPage } from "../pages/menu/menu";
import { DoctorHomePage } from "../pages/doctorhome/doctorhome";
import { WelcomePage } from "../pages/welcome/welcome";
import { ContactPage } from "../pages/contact/contact";
import { Badge } from "@ionic-native/badge";
import { Storage } from "@ionic/storage";
import { DataProvider } from "../providers/data/data";
import { Network } from "@ionic-native/network";
import {
  ToastController,
  LoadingController,
  AlertController,
  ModalController,
} from "ionic-angular/";
import { Observable } from "rxjs/Rx";
import { AppVersion } from "@ionic-native/app-version";
import { Market } from "@ionic-native/market";
import { AndroidPermissions } from "@ionic-native/android-permissions";
import { ProfilePage } from "../pages/profile/profile";
import { PaymentHistoryPage } from "../pages/payment-history/payment-history";
import { SubscriptionHistoryPage } from "../pages/subscription-history/subscription-history";

import { SubscriptionHistoryDocPage } from "../pages/subscription-history-doc/subscription-history-doc";
import { FeedbackPage } from "../pages/feedback/feedback";
import { OneSignal } from "@ionic-native/onesignal";

@Component({
  templateUrl: "app.html",
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  doctor_id: any;
  doc_new_total_count_appoint_counter: any;
  user_login_type: any;
  current_version_name: any;
  current_version_code: any;
  current_version_id: any;
  app_platform: string;
  my_person_type: string;

  rootPage: any;
  signal_app_id: string = "8c272963-d90e-415d-91eb-af6471836603";
  // Your App ID: 8c272963-d90e-415d-91eb-af6471836603
  firebase_sender_id: string = "834061789883";
  user_details: any;
  jsonBody;
  other_names;
  surname;
  user_type;

  self = this;

  pages: Array<{
    title: string;
    component: any;
    feature: string;
    icon: string;
  }>;

  pages2: Array<{
    title: string;
    component: any;
    feature: string;
    icon: string;
  }>;

  constructor(
    public oneSignal: OneSignal,
    public event: Events,
    public menu: MenuController,
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public loadingCtrl: LoadingController,
    private market: Market,

    private badge: Badge,
    public storage: Storage,
    public data: DataProvider,
    private network: Network,
    public alertCtrl: AlertController,
    private appVersion: AppVersion,
    public toastCtrl: ToastController,
    private androidPermissions: AndroidPermissions
  ) {
    this.menu.enable(true);

    this.initializeApp();

    this.event.subscribe("user_details", (data) => {
      this.user_details = data;
      console.log("CUSTOMER DETAILS HERE" + this.user_details);
      console.log(data);
      console.log(JSON.stringify(data));
      this.other_names = this.user_details[0].other_names;
      this.surname = this.user_details[0].surname;
      this.user_type = this.user_details[0].user_type;

      console.log("FIRST NAME " + this.other_names);
      console.log("USER TYPE " + this.user_type);
    });

    console.log("Readdddyyyyyyy-------READY!!!!!!!!!!!!!!!!!");

    this.storage.get("person_type").then((person_type) => {
      this.my_person_type = person_type;
      console.log("Person type " + this.my_person_type);
    });

    this.storage.get("remember").then((remember) => {
      console.log("remember = " + remember);
      if (remember == true) {
        this.storage.get("user_login_type").then((user_login_type) => {
          console.log(`user_login_type = ${user_login_type}`);
          if (user_login_type == "Doctor") {
            this.rootPage = DoctorHomePage;
          }
          if (user_login_type == "Nurse") {
            this.rootPage = DoctorHomePage;
          } else if (user_login_type == "Patient") {
            this.rootPage = WelcomePage;
          } else {
            this.rootPage = WelcomePage;
            //this.rootPage = MenuPage; //CHANGE TO WELCOMEPAGE
          }
        });
      } else {
        this.rootPage = WelcomePage;
      }
    });

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

    this.pages2 = [
      {
        title: "My Subscriptions",
        component: SubscriptionHistoryDocPage,
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

    this.get_appointments_badge();

    platform.ready().then(() => {
      this.androidPermissions
        .checkPermission(this.androidPermissions.PERMISSION.CAMERA)
        .then(
          (result) => console.log("Has permission?", result.hasPermission),
          (err) =>
            this.androidPermissions.requestPermission(
              this.androidPermissions.PERMISSION.CAMERA
            )
        );

      this.androidPermissions.requestPermissions([
        this.androidPermissions.PERMISSION.CAMERA,
        this.androidPermissions.PERMISSION.GET_ACCOUNTS,
      ]);

      this.listenConnection();
    });
  }

  editpro() {
    this.nav.push(ProfilePage);
  }

  private listenConnection(): void {
    this.network.onDisconnect().subscribe(() => {});
  }

  async requestPermission() {
    try {
      let hasPermission = await this.badge.hasPermission();
      console.log(hasPermission);
      if (!hasPermission) {
        let permission = await this.badge.requestPermission();
        // let permission = await this.badge.registerPermission();
        console.log(permission);
      }
    } catch (e) {
      console.error(e);
    }
  }

  async setBadges(badgeNumber: number) {
    try {
      let badges = await this.badge.set(badgeNumber);
      console.log(badges);
    } catch (e) {
      console.error(e);
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.requestPermission();
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.setupPush();

      // var notificationOpenedCallback = function (jsonData) {
      //   console.log("notificationOpenedCallback: " + JSON.stringify(jsonData));
      // };

      // // Set your iOS Settings
      // var iosSettings = {};
      // iosSettings["kOSSettingsKeyAutoPrompt"] = false;
      // iosSettings["kOSSettingsKeyInAppLaunchURL"] = false;

      // window["plugins"].OneSignal.startInit(
      //   "8c272963-d90e-415d-91eb-af6471836603",
      //   "834061789883"
      // )
      //   .handleNotificationOpened(notificationOpenedCallback)
      //   .iOSSettings(iosSettings)
      //   .inFocusDisplaying(
      //     window["plugins"].OneSignal.OSInFocusDisplayOption.Notification
      //   )
      //   .endInit();

      // // The promptForPushNotificationsWithUserResponse function will show the iOS push notification prompt. We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step 6)
      // window["plugins"].OneSignal.promptForPushNotificationsWithUserResponse(
      //   function (accepted) {
      //     console.log("User accepted notifications: " + accepted);
      //   }
      // );

      // this.oneSignal.startInit(
      //   "8c272963-d90e-415d-91eb-af6471836603",
      //   "834061789883"
      // );

      // this.oneSignal.inFocusDisplaying(
      //   this.oneSignal.OSInFocusDisplayOption.InAppAlert
      // );

      // this.oneSignal.handleNotificationReceived().subscribe((res) => {
      //   let msg = res.payload.body;
      //   let title = res.payload.title;
      //   let additionalData = res.payload.additionalData;
      //   this.showalertmessage_default(title, msg);

      //   console.log(res);
      // });

      // this.oneSignal.handleNotificationOpened().subscribe((res) => {
      //   let additionalData = res.notification.payload.additionalData;
      //   this.showalertmessage_default(
      //     "Notification Opened",
      //     "You already read this before"
      //   );
      //   console.log(res);
      // });

      // this.oneSignal.endInit();
    });
  }

  setupPush() {
    this.oneSignal.startInit(this.signal_app_id, this.firebase_sender_id);

    this.oneSignal.inFocusDisplaying(
      this.oneSignal.OSInFocusDisplayOption.InAppAlert
    );

    this.oneSignal.handleNotificationReceived().subscribe((res) => {
      let msg = res.payload.body;
      let title = res.payload.title;
      let additionalData = res.payload.additionalData;
      this.showalertmessage_default(title, msg);

      console.log(res);
    });

    this.oneSignal.handleNotificationOpened().subscribe((res) => {
      let additionalData = res.notification.payload.additionalData;
      this.showalertmessage_default(
        "Notification Opened",
        "You already read this before"
      );
      console.log(res);
    });

    this.oneSignal.endInit();
  }

  ionViewDidEnter() {
    //  this.menu.enable(true);
    this.platform.ready().then(() => {
      // this.keyboard.disableScroll(false);
    });
  }

  ionViewWillLeave() {
    this.platform.ready().then(() => {
      // this.keyboard.disableScroll(false);
    });
  }

  ngOnInit(): void {
    this.get_appointments_badge();

    this.platform.ready().then(() => {
      this.listenConnection();
    });
  }

  async get_appointments_badge() {
    try {
      this.storage.get("doctor_id").then((doctor_id) => {
        this.doctor_id = doctor_id;

        if (this.doctor_id) {
          Observable.interval(200000)
            .timeInterval()
            .flatMap(() =>
              this.data
                .get_new_general_appointments_count(
                  this.doctor_id,
                  this.my_person_type
                )
                .then((result) => {
                  var jsonBody = result["_body"];

                  if (jsonBody) {
                    jsonBody = JSON.parse(jsonBody);

                    if (jsonBody["appointments_total_without_pds"]) {
                      this.badge.set(
                        jsonBody["appointments_total_without_pds"]
                      );
                    }
                  }
                })
            )
            .subscribe((data) => {});
        }
      });
    } catch (e) {
      console.log(e);
    }
  }

  // getappVersion() {

  //   if (this.platform.is('ios')) {
  //     this.app_platform = 'IOS';
  //   } else {
  //     this.app_platform = 'ANDROID';
  //   }

  //   this.data.get_appversion(this.app_platform).then((data) => {

  //     console.log("RESULTS IS " + JSON.stringify(data));
  //     var body = data["_body"];
  //     data = JSON.parse(body);

  //     var desc = body["resp_desc"];
  //     var code = body["resp_code"];

  //     if (data['resp_code'] === "000") {
  //       if (data['id'] && data["version"]) {
  //         if (this.current_version_id == data['id']) {
  //           console.log("App ID is same. = " + data['id']);

  //           if (parseInt(this.current_version_code) == parseInt(data['code'])) {
  //             console.log("App code is same. = " + data['code']);
  //           } else {

  //             let confirm = this.alertCtrl.create({
  //               title: 'Old App Version',
  //               message: 'You have an older version of this app. Kindly click OK in order to update the app on playstore',
  //               buttons: [
  //                 {
  //                   text: 'OK',
  //                   handler: () => {
  //                     let loader = this.loadingCtrl.create({
  //                       content: "Please wait...",
  //                       duration: 5000
  //                     });

  //                     loader.present();

  //                     setTimeout(() => {
  //                       console.log("going to market");
  //                       this.market.open(this.current_version_id);

  //                     }, 1);

  //                     setTimeout(() => {
  //                       loader.dismiss();
  //                     }, 1);

  //                   }
  //                 }
  //               ]
  //             });
  //             confirm.present();

  //             console.log("You are using Android device");

  //             console.log("App code is different. = " + data['code'] + " " + this.current_version_code);
  //           }

  //         } else {
  //           console.log("App ID is different. = " + data['id'] + this.current_version_id);
  //         }

  //       }
  //     }
  //     console.log(data['resp_code']);
  //     console.log(data);
  //   }, (err) => {
  //     console.log(err);
  //   });

  // }

  openPage(page) {
    if (page.component) {
      this.nav.push(page.component, { user_details: this.user_details });
    } else {
      // Since the component is null, this is the logout option
      // ...
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
              this.storage.set("remember", false);
              this.nav.setRoot(LoginPage);
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

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 7000,
      position: "top",
    });
    toast.present();
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
