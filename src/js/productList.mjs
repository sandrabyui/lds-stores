import { getParam, renderListWithTemplate } from "./utils.mjs";

var category = getParam('category');

function productTemplate(product) {
  return `
  <a href="../product_pages/index.html?product=${product.id}&category=${category}">
  <li class="">
        <div class="product-card"><div class="image-container"><img
            src="${product.imageUrl}"
            alt="${product.name}"
        /></div>
        <div class="product-title-section">
        <h4 class="card__name">${product.name}</h4>
        <p class="product-card__price">${product.price}</p></div>
        </div>
        </li></a>
      `;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    // We passed in this information to make our class as reusable as possible.
    // Being able to define these things when we use the class will make it very flexible
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    // our dataSource will return a Promise...so we can use await to resolve it.
    const list = await this.dataSource.getData(this.category);
    // render the list
    console.log(list.scriptures);
    renderListWithTemplate(productTemplate, this.listElement, list.result);
  }
}
