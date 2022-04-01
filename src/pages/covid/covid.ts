// import { Component } from "@angular/core";
// import { NavController, NavParams } from "ionic-angular";
// import { BookCovidPage } from "../book-covid/book-covid";
// import { MenuPage } from "../menu/menu";
// import { DataProvider } from "../../providers/data/data";
// import {
//   ToastController,
//   LoadingController,
//   AlertController,
// } from "ionic-angular";
// import { SubscriptionSummaryPage } from "../subscription-summary/subscription-summary";

// @Component({
//   selector: "page-covid",
//   templateUrl: "covid.html",
// })

import { Component } from "@angular/core";
import { DoctorHomePage } from "../doctorhome/doctorhome";
import { AboutPage } from "../about/about";
import { ContactPage } from "../contact/contact";
import { HomePage } from "../home/home";
import { ProfilePage } from "../profile/profile";

import { MedicalrecordPage } from "../medicalrecord/medicalrecord";
import { MorePage } from "../more/more";
import { NotificationsPage } from "../notifications/notifications";

@Component({
  templateUrl: "covid.html",
})
export class CovidPage {
  tab1Root = DoctorHomePage;
  tab2Root = ProfilePage;

  tab4Root = MorePage;

  constructor() {}
}
