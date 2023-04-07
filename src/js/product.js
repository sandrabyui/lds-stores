import { setLocalStorage, getParam, loadHeaderFooter } from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';
import ProductDetails from './ProductDetails.mjs';

loadHeaderFooter();


var category = getParam('category');

const dataSource = new ExternalServices(category);
const productId = getParam('product');

const product = new ProductDetails(productId, dataSource);
product.init();