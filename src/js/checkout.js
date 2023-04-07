// 6  Do the same thing for product_pages/index.html, cart/index.html and cart/checkout.html (you will probably need to create a checkout.js file for this)

import { loadHeaderFooter } from './utils.mjs';
import CheckoutProcess from './CheckoutProcess.mjs';

loadHeaderFooter();

const myCheckout = new CheckoutProcess('so-cart', '.checkout-summary');
myCheckout.init();

document
  .querySelector('#zip')
  .addEventListener('blur', myCheckout.calculateOrdertotal.bind(myCheckout));
// listening for click on the button
document.querySelector('#checkoutSubmit')
.addEventListener('click', (e) => {
  e.preventDefault();
  // let myForm = document.forms[0];
  // let chk_status = myForm.checkValidity();
  // myForm.reportValidity();
  // if(chk_status) 

  myCheckout.checkout();
});