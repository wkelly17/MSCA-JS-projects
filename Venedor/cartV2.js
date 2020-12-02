class Cart {
  constructor() {
    //@# Dome containers Used to change from table showing and hiding
    this.shoppingDisplayContainer = document.querySelector(
      '#homePageContainer'
    );
    this.checkoutTableContainer = document.querySelector(
      '#checkoutTableContainer'
    );

    //@# populating Cart from local storage or starting new
    let localStorageCart = JSON.parse(localStorage.getItem('cart'));
    this.cart = localStorageCart || {
      quantity: 0,
      cartTotal: 0,
      products: [],
    };

    if (localStorageCart) {
      this.cart.quantity = localStorageCart.quantity;
      this.cart.cartTotal = localStorageCart.cartTotal;
      this.cart.products = localStorageCart.products;
    }

    // @# DOM controls for table and adding to cart;
    this.cartDisplay = document.querySelector('[data-role = "page-cart"]');
    this.cartQuantityDisplay = this.cartDisplay.children[1];
    this.cartTotalDisplay = this.cartDisplay.children[2];
    this.addToCartBtns = document.querySelectorAll('.addCartBtn');
    this.checkoutTableBody = document.querySelector('#checkoutCartTableData');
    this.cartQuantityControllers = document.querySelectorAll(
      '.cartQuantityController'
    );
    this.deleteRowControls = document.querySelectorAll(
      '[data-role = "deleteItem"]'
    );
    this.addEventListeners();
  }

  //@@ Event listeners and Functions to run on class load;
  addEventListeners() {
    this.addToCartBtns.forEach((button) =>
      button.addEventListener('click', (event) => {
        this.addToCart(event);
      })
    );
    this.cartDisplay.addEventListener('click', (event) => {
      this.toggleCheckoutTable(event);
    });
    this.updateCartButton();
    this.populateTable();
  }

  //@# Matching cart state to DOM button
  updateCartButton() {
    this.cartQuantityDisplay.innerText = this.cart.quantity;
    this.cartTotalDisplay.innerText = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(this.cart.cartTotal);
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

    this.cart.quantity++;
    this.cart.cartTotal += Number(price);
    this.updateCartButton();
    //Adding product object cart.products array after checking to see if it exists
    if (!this.checkCartItems(product)) {
      this.cart.products.push(item);
    } else {
      let selected = this.getSelected(product); //filter returns array, hence selected[0]
      selected[0].quantity++;
    }
    this.updateLocaleStorage();
    this.populateTable();
  }

  updateLocaleStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  checkCartItems(product) {
    return this.cart.products.some((item) => item.product == product);
  }
  getSelected(product) {
    return this.cart.products.filter((item) => item.product == product);
  }

  toggleCheckoutTable() {
    this.shoppingDisplayContainer.classList.toggle('invisible');
    this.checkoutTableContainer.classList.toggle('invisible');
  }

  populateTable() {
    //always clearing table and populating with freshest data
    this.checkoutTableBody.innerHTML = '';
    if (this.cart.products.length == 0) {
      return (this.checkoutTableBody.innerHTML =
        '<tr> <td colspan = "5" >No Items in the cart.  Time to go shop!</td> </tr>');
    }
    this.cart.products.forEach((cartItem) => {
      let { product, image, quantity, price } = cartItem;
      let subtotal = price * quantity;
      subtotal = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(subtotal);
      price = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(price);
      this.checkoutTableBody.innerHTML += `
        <tr>
          <td>${product}: <img src='${image}' alt='${product}'></td>
          <td>Fake Code: 1111</td> 
          <td>${price}</td>
          <td><input type='number' name='cartQuantityController' class = "cartQuantityController" id='' value = ${quantity} data-product = '${product}' ></td>
          <td>${subtotal} <svg class="icon icon-cross deleteItemIcon" data-role = 'deleteItem'  data-product = '${product}'>
          <use
            xlink:href="./media/icons/symbol-defs.svg#icon-cross"
          ></use>
          </svg></td>
          </tr>
        `;
    });

    this.checkoutTableBody.innerHTML += `
    <tr>
            <td colspan = "4" class = "elongated">Subtotal</td>
            <td>${new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(this.cart.cartTotal)}</td>
          </tr>
          <tr>
            <td colspan = "4" class = "elongated">Shipping</td>
            <td>$7.00</td>
          </tr>
          <tr>
            <td colspan = "4" class = "elongated">Tax(0%)</td>
            <td>$0.00</td>
          </tr>
          <tr>
            <td colspan = "4" class = "elongated emphasized">Total</td>
            <td class = "colored">${new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(this.cart.cartTotal + 7)}</td>
          </tr>
    `;

    this.getTableControls();
    this.updateCartButton();
    this.updateLocaleStorage();
  }
  updateQuantity(event) {
    let product = event.target.dataset.product;
    let selected = this.getSelected(product)[0];
    let input = event.target;
    this.cart.quantity += Number(input.value - selected.quantity);
    this.cart.cartTotal -= selected.quantity * selected.price;
    selected.quantity = input.value;
    this.cart.cartTotal += selected.quantity * selected.price;
    if (input.value == 0) {
      return this.deleteProduct(event);
    }
    this.populateTable();
  }
  deleteProduct(event) {
    let product = event.target.dataset.product;
    let selected = this.getSelected(product)[0];
    let index = this.cart.products.indexOf(selected);
    this.cart.cartTotal -= Number(selected.price * selected.quantity);
    this.cart.quantity -= Number(selected.quantity);
    this.cart.products.splice(index, 1);
    this.populateTable();
  }
  getTableControls() {
    this.cartQuantityControllers = document.querySelectorAll(
      '.cartQuantityController'
    );
    this.deleteRowControls = document.querySelectorAll(
      '[data-role = "deleteItem"]'
    );

    this.cartQuantityControllers.forEach((quantity) =>
      quantity.addEventListener('change', (event) => {
        this.updateQuantity(event);
      })
    );
    this.deleteRowControls.forEach((control) =>
      control.addEventListener(
        'click',
        (event) => {
          this.deleteProduct(event);
        },
        { capture: true }
      )
    );
  }
}

new Cart();

//todo: add event listener to Cart to bring up Modal to checkout;
//todo: hook up a sliders JS
//done Do better than chevrons for slider buttons
//done(ish): try to fix css mobile and tablet size (were'nt given real designs, so some artistic license would be needed)
