let products = [];
let currentUser = null;

fetch('products.json')
  .then(res => res.json())
  .then(data => {
    products = data;
    displayProducts(data);
  });

function displayProducts(productList) {
  const list = document.getElementById("product-list");
  list.innerHTML = '';
  productList.forEach((p, index) => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `<img src="\${p.image}" alt="">
                     <h3>\${p.name}</h3>
                     <p>Price: ৳\${p.price}</p>
                     <button onclick="checkout(\${index})">Buy Now</button>`;
    list.appendChild(div);
  });
}

document.getElementById("searchInput").addEventListener("input", function() {
  const val = this.value.toLowerCase();
  const filtered = products.filter(p => 
    p.name.toLowerCase().includes(val) || (p.category && p.category.toLowerCase().includes(val))
  );
  displayProducts(filtered);
});

function toggleAuthModal() {
  const modal = document.getElementById("authModal");
  modal.style.display = modal.style.display === "block" ? "none" : "block";
}

function toggleCheckoutModal() {
  const modal = document.getElementById("checkoutModal");
  modal.style.display = modal.style.display === "block" ? "none" : "block";
}

function signup() {
  const name = document.getElementById("signupName").value;
  const email = document.getElementById("signupEmail").value;
  const pass = document.getElementById("signupPassword").value;
  localStorage.setItem("user", JSON.stringify({ name, email, pass }));
  alert("Signup successful!");
  toggleAuthModal();
}

function login() {
  const email = document.getElementById("loginEmail").value;
  const pass = document.getElementById("loginPassword").value;
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.email === email && user.pass === pass) {
    currentUser = user;
    alert("Login successful!");
    toggleAuthModal();
  } else {
    alert("Invalid credentials.");
  }
}

function checkout(index) {
  const p = products[index];
  document.getElementById("checkoutProduct").innerText = `Product: \${p.name} | ৳\${p.price}`;
  const productUrl = window.location.href + "#product-" + index;
  const waMessage = encodeURIComponent(`Order Request:\nProduct: \${p.name}\nPrice: ৳\${p.price}\nLink: \${productUrl}`);
  document.getElementById("whatsappLink").href = "https://wa.me/8801620301814?text=" + waMessage;
  toggleCheckoutModal();
}
