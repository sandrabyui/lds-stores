import { setLocalStorage } from './utils.mjs';

function productDetailsTemplate(product) {
    return `<section class="product-detail"> <h2>Product Detail For ${product.name} </h2>
    <div class="product-content"><div class="product-image"><img
      class="divider"
      src="${product.imageUrl}"
      alt="${product.name}"
    /></div><div class="prod-description">
    <h3>${product.name}</h3>
    <h4 class="product-card__price">Price: $${product.price}</h4>
    <p class="product__description">
    Lorem Ipsum
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.id}">Add to Cart</button>
    </div></div></section>`;
}

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }
    async init() {
        // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
        this.product = await this.dataSource.findProductById(this.productId);
        console.log(this.product);
        // once we have the product details we can render out the HTML
        this.renderProductDetails('main');
        // once the HTML is rendered we can add a listener to Add to Cart button
        // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
        document
            .getElementById('addToCart')
            .addEventListener('click', this.addToCart.bind(this));
    }

    addToCart() {
        setLocalStorage('so-cart', this.product);
    }

    renderProductDetails(selector) {
        const element = document.querySelector(selector);
        element.insertAdjacentHTML(
            'afterBegin',
            productDetailsTemplate(this.product)
        );
    }
}