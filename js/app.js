const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <h3>Rating: <span class='amr-shop-rating'>${product.rating.rate}</span></h3>
      <h3>Count: <span class='amr-shop-rating'>${product.rating.count}</span></h3>
      <h2>Price: $ ${product.price}</h2>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      <button onclick="showDetails(${product.id})" id="details-btn" class="btn btn-danger">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTotal();
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
  // document.getElementById(id).innerText = Math.round(total);
  document.getElementById(id).innerText =parseFloat(total.toFixed(2));
};

// set innerText function
const setInnerText = (id, value) => {
  // document.getElementById(id).innerText = Math.round(value);
  document.getElementById(id).innerText = parseFloat(value.toFixed(2));
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

// Show Details Function

const showDetails = (productId) =>{
  const url = `https://fakestoreapi.com/products/${productId}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayShowDetails(data))
}

  const displayShowDetails = (details) =>{
    console.log(details);
    const showDiv = document.getElementById('show-details');
    showDiv.textContent= '';
    const div = document.createElement('div');
    div.classList.add("container");
    div.innerHTML = `
    <div class="single-product mx-auto">
        <div>
          <img class="product-image" src=${details.image}></img>
        </div>
        <h3>${details.title}</h3>
        <p><b>Category:</b> ${details.category}</p>
        <p><b>Decription:</b> ${details.description.slice(0,100)}</p>
        <h3><b>Rating:</b> <span class='amr-shop-rating'>${details.rating.rate}</span></h3>
        <h3><b>Count:</b> <span class='amr-shop-rating'>${details.rating.count}</span></h3>
        <h2><b>Price:</b> $ ${details.price}</h2>
      </div>
      
      `;
      showDiv.appendChild(div);
  }

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = parseFloat(grandTotal.toFixed(2));
};

// updateTotal();
