// ---------------load product ------------------
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// --------------show all product in UI ---------------
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    // console.log(product.id);
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h4>${product.title}</h4>
      <p>Category: ${product.category}</p>
      <h3>Price: $ ${product.price}</h3>
      <h5>Review: ${product.rating.count} people</h5>
      <h5>Rating: ${product.rating.rate} </h5>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn cart-button text-light">add to cart</button>
      <button onclick="singleProduct(${product.id})" id="details-btn" class="btn details-button text-light">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
// ------------single product ----------------------
const singleProduct = id => {
  fetch(`https://fakestoreapi.com/products/${id}`)
    .then(res => res.json())
    .then(data => displaySingleProduct(data))
}

const displaySingleProduct = item => {
  // console.log(item);
  const image = item.image;
  const singleProduct = document.getElementById("single-product");
  singleProduct.classList.add("product");
  singleProduct.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h4>${item.title}</h4>
      <p>Category: ${item.category}</p>
      <h3>Price: $ ${item.price}</h3>
      <h5>Review: ${item.rating.count} people</h5>
      <h5>Rating: ${item.rating.rate} </h5>
      <button onclick="addToCart(${item.id},${item.price})" id="addToCart-btn" class="buy-now btn cart-button text-light">add to cart</button>
     
      `;
}

let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = parseFloat(total).toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = parseFloat(value).toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
  updateTotal();
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};

const placeOrder = () => {
  alert("Your order is Successfully purchased.")
}