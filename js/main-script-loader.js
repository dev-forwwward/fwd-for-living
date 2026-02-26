import { mainInit } from './main.js';
import { homepage } from './homepage.js';
import { navBarMenu } from './menu.js';
import { form } from './form.js';
import { footerDate } from './footer-date.js';
import { swiperInit } from './swiper.js';
import { caseTransition } from './case-transition.js';
import { homepageHeroTrail } from './homepage-hero-trail.js';

console.log("Loading main scripts loader");

homepageHeroTrail();
mainInit();
homepage();
navBarMenu();
form();
footerDate();
swiperInit();
caseTransition();