document.addEventListener("DOMContentLoaded", () => {

   const products = [
        {id:1,Name:"Product-1",price:23},
        {id:2,Name:"Product-2",price:43},
        {id:3,Name:"Product-3",price:13},
        {id:4,Name:"Product-4",price:33},
    ];

    const cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));

    const productList = document.getElementById("product-list"); 
    const cartItems = document.getElementById("cart-items");
    const emptyCartMessage = document.getElementById("empty-cart");
    const cartTotalMessage = document.getElementById("cart-total");
    const totalPrice = document.getElementById("total-price");
    const CheckoutBtn= document.getElementById("Checkout-btn");

    products.forEach(product=>{
        const productDiv =  document.createElement("div");
        productDiv.classList.add("product");
        productDiv.innerHTML = `<span>${product.Name} - ₹${product.price}</span>
        <button data-id = ${product.id}>Add to cart</button>`
        productList.append(productDiv)
    });


    productList.addEventListener("click", (e)=>{
        if(e.target.tagName === "BUTTON"){
         const selectid = parseInt(e.target.getAttribute("data-id"))
         const product = products.find(p => p.id === selectid)
         addtocart(product)
        }
    })
   
    function addtocart(product){
        let storedItems = JSON.parse(localStorage.getItem("cart")) || [];
        storedItems.push(product);
        localStorage.setItem("cart", JSON.stringify(storedItems));
        rendercart();
    }

    function rendercart(){
       emptyCartMessage.innerText="";
       cartItems.innerText=""
       let pricesum = 0;
       const localcart = JSON.parse(localStorage.getItem("cart"));
       if(localcart.length > 0){
            cartTotalMessage.classList.remove("hidden")
            localcart.forEach((item,index) => {
                pricesum += item.price;
                const cartdiv = document.createElement("div");
                cartdiv.classList.add("product");
                cartdiv.classList.add("remove");
                cartdiv.innerHTML = `${item.Name} - ₹${item.price} <button data-id = ${item.id}>Delete</button>`;
                cartItems.appendChild(cartdiv);
            })
            totalPrice.innerText = `₹${pricesum.toFixed(2)}`
        }
       else{
        cartItems.innerHTML = `<p id="empty-cart">Your cart is Empty</p>`
        cartTotalMessage.classList.add("hidden")
       }
    }


    CheckoutBtn.addEventListener("click",()=>{
        cart.length =0;
        alert("Checked out the all item")
        rendercart();
    })

    cartItems.addEventListener("click", (e)=> {
        if(e.target.tagName === "BUTTON"){
            const selectid = parseInt(e.target.getAttribute("data-id"))
            let storedItems = JSON.parse(localStorage.getItem("cart")) || [];
            storedItems = storedItems.filter(item => item.id !== selectid);
            localStorage.setItem("cart", JSON.stringify(storedItems));

        }
        rendercart();
    })



})