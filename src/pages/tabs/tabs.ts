import { Component } from '@angular/core';
import { MenuPage } from '../menu/menu';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';

import { MedicalrecordPage } from "../medicalrecord/medicalrecord";
import { MorePage } from "../more/more";
import { NotificationsPage } from "../notifications/notifications";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = MenuPage;
  tab2Root = ProfilePage;
  tab3Root = MedicalrecordPage;
  tab4Root = MorePage;
  tab5Root = NotificationsPage
  
 

  constructor() {

  }
}
