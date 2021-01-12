// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// import { AppModule } from './app.module';

// platformBrowserDynamic().bootstrapModule(AppModule);


import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {enableProdMode} from '@angular/core';
import { AppModule } from './app.module';

// disable console log
// console.log = function(){};

// this is the magic wand
enableProdMode();
platformBrowserDynamic().bootstrapModule(AppModule);


