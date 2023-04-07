import {
  getLocalStorage,
  setLocalStorage,
  alertMessage
} from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';

const services = new ExternalServices();
function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

function packageItems(items) {
  const simplifiedItems = items.map((item) => {
    console.log(item);
    return {
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: 1,
    };
  });
  return simplifiedItems;
}

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    [this.list] = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }
  init() {
    this.list = getLocalStorage(this.key);
    // console.log([this.list])
    this.calculateItemSummary();
  }
  calculateItemSummary() {
    const summaryElement = document.querySelector(
      this.outputSelector + ' #cartTotal'
    );
    // console.log(summaryElement)
    const itemNumElement = document.querySelector(
      this.outputSelector + ' #num-items'
    );
    itemNumElement.innerText = [this.list].length;
    // console.log([this.list])
    // calculate the total of all the items in the cart
    const amounts = [this.list.FinalPrice];
    // console.log(amounts)
    this.itemTotal = amounts.reduce((sum, item) => sum + item);
    summaryElement.innerText = '$' + this.itemTotal;
    this.calculateOrdertotal();
  }
  calculateOrdertotal() {
    this.shipping = 10 + ([this.list].length - 1) * 2;
    this.tax = (this.itemTotal * 0.06).toFixed(2);
    this.orderTotal = (
      parseFloat(this.itemTotal) +
      parseFloat(this.shipping) +
      parseFloat(this.tax)
    ).toFixed(2);
    this.displayOrderTotals();
  }
  displayOrderTotals() {
    const shipping = document.querySelector(this.outputSelector + ' #shipping');
    const tax = document.querySelector(this.outputSelector + ' #tax');
    const orderTotal = document.querySelector(
      this.outputSelector + ' #orderTotal'
    );
    shipping.innerText = '$' + this.shipping;
    tax.innerText = '$' + this.tax;
    orderTotal.innerText = '$' + this.orderTotal;
  }
  async checkout() {
    const formElement = document.forms[0];

    const json = formDataToJSON(formElement);
    // add totals, and item details
    json.orderDate = new Date();
    json.orderTotal = this.orderTotal;
    json.tax = this.tax;
    json.shipping = this.shipping;
    json.items = packageItems([this.list]);

    try {
      // const res = await services.checkout(json);
      location.assign('../checkout/success.html');
      setLocalStorage('so-cart', {});
    } catch (err) {
      const error = err.message;
      console.log(error);
      Object.values(error).forEach((e)=>{
        alertMessage(e);
      })
      console.log(err.message);
    }
  }
}