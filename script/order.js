document.addEventListener("DOMContentLoaded", function () {

let cart = {};

const items = Array.from(document.querySelectorAll(".item"));
const suggestionsEl = document.getElementById("suggestions");

function addToCartModal(btn){
    const itemEl = btn.closest(".item");
    const name = itemEl.dataset.name;
    const price = parseFloat(itemEl.dataset.price);
    if(cart[name]) cart[name].qty++;
    else cart[name] = { price, qty: 1 };
    updateCartCount();
    openCart();
}

function updateCartCount(){
    const totalQty = Object.values(cart).reduce((a,b)=>a+b.qty,0);
    document.getElementById("cartBtn").innerText = `Cart (${totalQty})`;
    renderCartItems();
}

function renderCartItems(){
    const container = document.getElementById("cartItems");
    container.innerHTML = "";
    let total = 0;

    for(const key in cart){
        const c = cart[key];
        total += c.price * c.qty;
        const div = document.createElement("div");
        div.className = "cartItem";
        div.innerHTML = `${key} - $${c.price} x ${c.qty}
        <button onclick="removeItem('${key}')">Remove</button>`;
        container.appendChild(div);
    }
    document.getElementById("totalPrice").innerText = `Total: $${total}`;
}

window.removeItem = function(name){
    delete cart[name];
    updateCartCount();
}

window.openCart = function(){
    document.getElementById("cartModal").style.display = "flex";
}

window.closeCart = function(){
    document.getElementById("cartModal").style.display = "none";
}

// ===== SEARCH =====
window.searchFood = function(){
    const input = document.getElementById("searchInput").value.toLowerCase().trim();
    let found = false;

    items.forEach(item => {
        if(item.dataset.name.includes(input)){
            item.style.display = "block";
            found = true;
        } else {
            item.style.display = "none";
        }
    });

    document.getElementById("notFound").style.display =
        input && !found ? "block" : "none";
        
    suggestionsEl.style.display = "none";
}

window.showSuggestions = function(value){
    const val = value.toLowerCase().trim();
    suggestionsEl.innerHTML = "";

    if(!val){
        suggestionsEl.style.display = "none";
        items.forEach(i => i.style.display = "block");
        document.getElementById("notFound").style.display = "none";
        return;
    }

    const matches = items
        .filter(i => i.dataset.name.includes(val))
        .map(i => i.dataset.name);

    if(matches.length){
        suggestionsEl.style.display = "block";
        matches.forEach(m => {
            const div = document.createElement("div");
            div.textContent = m;
            div.onclick = () => {
                document.getElementById("searchInput").value = m;
                suggestionsEl.style.display = "none";
                searchFood();
            };
            suggestionsEl.appendChild(div);
        });
    } else {
        suggestionsEl.style.display = "none";
    }
}

// ===== brightness adjacer =====
window.toggleTheme = function(){
    document.body.classList.toggle("light-mode");
    document.querySelector(".theme-btn").innerText =
        document.body.classList.contains("light-mode") ? "🌙" : "☀️";
}

});