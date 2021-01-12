import { Component } from '@angular/core';
import { MenuPage } from '../menu/menu';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = MenuPage;
  tab2Root = ProfilePage;
 

  constructor() {

  }
}
