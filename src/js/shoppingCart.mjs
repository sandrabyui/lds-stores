import ProductList from './ProductList.mjs';
import {getLocalStorage} from './utils.mjs';


export default class shoppingCart {
    constructor(key, selector) {
        this.key = key;
        this.selector = selector;
        this.total = 0;
    }

    async init() {
      const list = getLocalStorage(this.key);
      this.calculateListTotal(list);
      this.renderCartContents(list);
    }
    calculateListTotal(list) {
      const amounts = [list].map((item) => item.price);
      this.total = amounts.reduce((sum, item) => sum + item);
    }
  
    renderCartContents() {
        const cartItems = getLocalStorage(this.key);
        const htmlItems = [cartItems].map((item) => cartItemTemplate(item));
        document.querySelector(this.selector).innerHTML = htmlItems.join('');
        document.querySelector('.list-total').innerText += ` $${this.total}`;
    }
}


  function cartItemTemplate(item) {
    const newItem = `<li class="cart-card divider">
    <a href="#">
      <img
        src="${item.imageUrl}"
        alt="${item.name}"
      />
    </a>
    <a href="../product_pages/index.html?product=${item.id}" class="cart-card__image">
      <h2 class="card__name">${item.name}</h2>
    </a>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.price}</p>
  </li>`;

    return newItem;
  }
