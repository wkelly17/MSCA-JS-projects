// export default
class Cart {
  constructor() {
	this.cart = JSON.parse(localStorage.getItem('cart')) || [];
    this.cartQuantityState =
      JSON.parse(localStorage.getItem('cartQuantityState')) || 0;
    this.cartTotal = JSON.parse(localStorage.getItem('cartTotal')) || 0;

    this.cartDisplay = document.querySelector('[data-role = "page-cart"]');
    this.cartQuantityDisplay = this.cartDisplay.children[1];
    this.cartTotalDisplay = this.cartDisplay.children[2];;

	this.addToCartBtns = document.querySelectorAll('.addCartBtn');
    console.dir(this.checkoutTable);
    this.addEventListeners();
    console.log(location.hash);
  }

  // methods
  addEventListeners() {
    this.addToCartBtns.forEach((button) =>
      button.addEventListener('click', (event) => {
        this.addToCart(event);
      })
    );
	this.cartDisplay.addEventListener('click', this.showCheckoutPage);
	window.onload(this.updateCartButton)
  }

  updateCartButton() {
    this.cartQuantityDisplay.innerText = this.cartQuantityState;
    this.cartTotalDisplay.innerText = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(this.cartTotal);
  }

  addToCart(event) {
    let button = event.target;
    let product = button.previousElementSibling.dataset.name;
    console.dir(button.previousElementSibling);
    let image = button.previousElementSibling.currentSrc;
    let price = button.dataset.price;
    let item = {
      product: product,
      image: image,
      quantity: 1,
      price: price,
    };
    console.dir(button);
    this.cartQuantityState++;
    this.cartQuantityDisplay.innerText = this.cartQuantityState;
    this.cartTotal += Number(price);
    this.cartTotalDisplay.innerText = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(this.cartTotal);
    if (!this.checkCartItems(product)) {
      this.cart.push(item);
    } else {
      let selected = this.getSelected(product); //returns array, hence incrementing 0
      selected[0].quantity++;
    }

    console.dir(this.cart);
    console.log(this.cart[product]);
    this.updateLocaleStorage();
  }

  //todo: see if img src needs updating
  //todo: update local storage cartDisplay state;
  updateLocaleStorage() {
    console.log(this.cartTotal);
    localStorage.setItem('cart', JSON.stringify(this.cart));
    localStorage.setItem('cartDisplay', this.cartDisplay);
    localStorage.setItem('cartTotal', this.cartTotal);
    localStorage.setItem('cartQuantityState', this.cartQuantityState);
  }

  checkCartItems(product) {
    // debugger;
    return this.cart.some((item) => item.product == product);
  }
  getSelected(product) {
    // debugger;
    return this.cart.filter((item) => item.product == product);
  }

  //? How to fix?
  showCheckoutPage() {
    window.location.href = './checkout.html'; //! Breaks
    window.addEventListener('load', () => {
      this.cartDisplay.innerHTML = this.cartDisplay.innerHTML;
      let tableBody = this.checkoutTable.firstElementChild;
      this.populateTable(tableBody);
    });
  }

  //   populateTable(tableBody) {
  //     this.cart.forEach((product) => {
  //       ({ product, image, quantity, price } = product);
  //       price = new Intl.NumberFormat('en-US', {
  //         style: 'currency',
  //         currency: 'USD',
  //       }).format(price);
  //       let subtotal = price * quantity;
  //       subtotal = new Intl.NumberFormat('en-US', {
  //         style: 'currency',
  //         currency: 'USD',
  //       }).format(subtotal);
  //       tableBody.innerHTML += `
  // 		  <tr>
  // 				<td>${product}: <img src='${image}' alt='${product}'></td>
  // 				<td>Fake Code: 1111</td>
  // 				<td>${price}</td>
  // 				<td>Quantity: ${quantity}</td>
  // 				<td>${subtotal}</td>
  // 			  </tr>
  // 		  `;
  //     });
  //   }

  updateCheckoutDisplay() {}
}

let shoppingCart = new Cart();
export default shoppingCart;
// new Cart();

// let cart = document.querySelector('[data-role = page-cart]');
// console.log(cart)

//todo: add event listener to Cart to bring up Modal to checkout;
//todo: hook up a sliders JS
//done Do better than chevrons for slider buttons
//done(ish): try to fix css mobile and tablet size (were'nt given real designs, so some artistic license would be needed)
