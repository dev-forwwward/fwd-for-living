import { testScript } from './test.js';
import { mainInit } from './main.js';
import { navBarMenu } from './menu.js';
import { form } from './form.js';
import { footerDate } from './footer-date.js';

console.log("This is coming from the main-script-loader.js");

testScript();
mainInit();
navBarMenu();
form();
footerDate();