import { loadHeaderFooter, getParam } from "./utils.mjs";
import ProductList from "./productList.mjs";
import ExternalServices from "./externalServices.mjs";

const category = getParam('category');

const dataSource = new ExternalServices(category);

document.getElementById('title').innerHTML = `Top products: ${category}`;

const element = document.querySelector('.product-list');

const productsList = new ProductList(category, dataSource, element);
productsList.init();

loadHeaderFooter();