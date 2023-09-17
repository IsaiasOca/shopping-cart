import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit{

  subtotal: number = 0;
  shippingFee: number = 0;
  taxes: number = 0;
  total: number = 0;

  products = [
    {
      Id: 1, 
      item_name: 'Product 1', 
      short_description: 'Description of product', 
      quantity: 1, 
      price_without_tax: 45.36, 
      tax: 12, 
      shipping_fee: 5
    },
    {
      Id: 2, 
      item_name: 'Product 2', 
      short_description: 'Description of product', 
      quantity: 1, 
      price_without_tax: 18.47, 
      tax: 16, 
      shipping_fee: 5
    },
    {
      Id: 3,
      item_name: 'Product 3', 
      short_description: 'Description of product', 
      quantity: 1, 
      price_without_tax: 95.48, 
      tax: 12, 
      shipping_fee: 5
    },
    {
      Id: 4, 
      item_name: 'Product 4', 
      short_description: 'Description of product', 
      quantity: 1, 
      price_without_tax: 65.24, 
      tax: 12, 
      shipping_fee: 5
    },
    {
      Id: 5, 
      item_name: 'Product 5', 
      short_description: 'Description of product', 
      quantity: 1, 
      price_without_tax: 84.78, 
      tax: 12, 
      shipping_fee: 2
    }
  ];

  ngOnInit(): void {
      this.calculateTotal();
  }

  calculateTotal(){
    this.subtotal = this.products.reduce((sum, item) => sum + item.price_without_tax, 0);
    this.shippingFee = this.products.reduce((sum, item) => sum + item.shipping_fee, 0);
    this.taxes = this.products.reduce((tax, item) => tax + item.price_without_tax * item.tax / 100, 0);
    this.total = this.subtotal + this.shippingFee + this.taxes;
  }

  removeAll(){
    this.products = []
    this.calculateTotal()
  }

  addQuantity(product: any){
    let unitPriceWT = product.price_without_tax / product.quantity
    let unitShippingFee = product.shipping_fee / product.quantity
    product.quantity += 1
    product.price_without_tax = unitPriceWT * product.quantity
    product.shipping_fee = unitShippingFee * product.quantity
    this.calculateTotal();
    console.log('cantidad desde add: ', product.quantity)
  }

  reduceQuantity(product: any){
    
    let unitPriceWT = product.price_without_tax / product.quantity
    let unitShippingFee = product.shipping_fee / product.quantity
    product.quantity -= 1
    console.log('cantidad que llega a reduce: ',product.quantity)
    if(product.quantity >= 1){
      product.price_without_tax = unitPriceWT * product.quantity
      product.shipping_fee = unitShippingFee * product.quantity
    } else {
      console.log('entra al else')
      this.deleteProduct(product);
    }
    this.calculateTotal()
  }

  deleteProduct(product: any){
    this.products = this.products.filter(productF => product.Id != productF.Id)
    this.calculateTotal();
  }

}
