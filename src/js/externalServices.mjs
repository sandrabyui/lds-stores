function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}
export default class ExternalServices {
  constructor(category) {
    this.category = category;
    this.path = `../json/${this.category}.json`;
  }
  async getData() {
    return fetch(this.path)
      .then(convertToJson)
      .then((data) => data);
  }
  async findProductById(id) {
    // const response = await fetch(baseURL + `product/${id}`);
    // const data = await convertToJson(response);
    // // console.log(data);
    // return data.Result;

    const products = await this.getData();
    return (products.result.find((item) => item.id === id));
  }
}
