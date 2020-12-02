class Checkout {
  constructor() {
    this.cart = JSON.parse(localStorage.getItem('cart')) || [];
    this.cartDisplay = document.querySelector('[data-role = "page-cart"]');
    this.cartQuantityState =
      JSON.parse(localStorage.getItem('cartQuantityState')) || 0;
    this.cartTotal = JSON.parse(localStorage.getItem('cartTotal')) || 0;
    this.cartQuantityDisplay = this.cartDisplay.children[1];
    this.cartTotalDisplay = this.cartDisplay.children[2];
    console.dir(this.cart);
    this.checkoutTable = document.querySelector('#checkoutCartTableData');
    this.cartQuantityControllers = document.querySelectorAll(
      '.cartQuantityController'
    );
    this.deleteRowControls = document.querySelectorAll(
      '[data-role = "deleteItem"]'
    );

	this.addEventListeners();
	this.populateTable()
  }

  addEventListeners() {
    this.cartQuantityControllers.forEach((quantity) =>
      quantity.addEventListener('change', (event) => {
        this.updateQuantity(event);
      })
    );
  }

  updateCartButton() {
    this.cartQuantityDisplay.innerText = this.cartQuantityState;
    this.cartTotalDisplay.innerText = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(this.cartTotal);
  }

  populateTable() {
    if (this.cart.length == 0) {
      return;
    }

    this.checkoutTable.innerHTML = '';
    this.cart.forEach((product) => {
      let productName = product.product;
      let image = product.image;
      let quantity = product.quantity;
      let price = product.price;
      //? Why won't it destructure?
      //   ({ product, image, quantity, price } = product );
      //   debugger;
      let subtotal = price * quantity;
      subtotal = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(subtotal);
      price = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(price);
      this.checkoutTable.innerHTML += `
		  <tr>
				<td>${productName}: <img src='${image}' alt='${productName}'></td>
				<td>Fake Code: 1111</td> 
				<td>${price}</td>
				<td><input type='number' name='cartQuantityController' class = "cartQuantityController" id='' value = ${quantity} data-product = '${productName}' ></td>
				<td>${subtotal} <svg class="icon icon-cross deleteItemIcon" data-role = 'deleteItem'  data-product = '${productName}'>
				<use
				  xlink:href="./media/icons/symbol-defs.svg#icon-cross"
				></use>
			  </svg></td>
			  </tr>
		  `;
    });

    this.checkoutTable.innerHTML += `
	<tr>
				  <td colspan = "4" class = "elongated">Subtotal</td>
				  <td>${new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(this.cartTotal)}</td>
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
          }).format(this.cartTotal + 7)}</td>
			  </tr>
	`;

    this.getTableControls();
    this.updateCartButton();
    this.updateLocaleStorage();
  }
  getTableControls() {
    this.cartQuantityControllers = document.querySelectorAll(
      '.cartQuantityController'
    );
    this.deleteRowControls = document.querySelectorAll(
      '[data-role = "deleteItem"]'
    );
    console.dir(this.cartQuantityControllers);
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
  updateQuantity(event) {
    let input = event.target;
    if (input.value == 0) {
      return this.deleteProduct(event);
    }
    console.log({ input });
    let product = event.target.dataset.product;
    let selected = this.getSelected(product);
    this.cartQuantityState += Number(input.value - selected[0].quantity);
    selected[0].quantity = input.value;
    this.cartTotal += Number(selected[0].price);
    this.populateTable();
  }
  deleteProduct(event) {
    debugger;
    let product = event.target.dataset.product;
    let selected = this.getSelected(product)[0];
    let index = this.cart.indexOf(selected);
    this.cartTotal -= Number(selected.price * selected.quantity);
    this.cartQuantityState -= Number(selected.quantity);
    this.cart.splice(index, 1);
    this.populateTable();
  }

  getSelected(product) {
    // debugger;
    return this.cart.filter((item) => item.product == product);
  }

  updateLocaleStorage() {
    console.log(this.cartTotal);
    localStorage.setItem('cart', JSON.stringify(this.cart));
    localStorage.setItem('cartDisplay', this.cartDisplay);
    localStorage.setItem('cartTotal', this.cartTotal);
    localStorage.setItem('cartQuantityState', this.cartQuantityState);
  }
}

let checkout = new Checkout();

//Can pull from local storage... on url load...
