const API_URL = "http://localhost:3000/products";

// Load products on page load
window.onload = getProducts;

// GET all products
async function getProducts() {
  const res = await fetch(API_URL);
  const data = await res.json();

  const list = document.getElementById("productList");
  list.innerHTML = "";

  data.forEach(product => {
    list.innerHTML += `
      <div class="product">
        <strong>${product.name}</strong> - ₹${product.price}
        <button onclick="deleteProduct('${product._id}')">Delete</button>
      </div>
    `;
  });
}

// ADD product
async function addProduct() {
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;

  if (!name || !price) {
    alert("Please enter all fields");
    return;
  }

  await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, price })
  });

  document.getElementById("name").value = "";
  document.getElementById("price").value = "";

  getProducts();
}

// DELETE product
async function deleteProduct(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });

  getProducts();
}