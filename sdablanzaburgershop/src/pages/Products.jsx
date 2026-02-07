import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

export default function Products() {
  const { addItem } = useContext(CartContext);

  const products = [
    {
      id: 1,
      name: 'Cheesy Goodness Burger',
      description: '2 patties, bacon, parmesan cheese',
      price: 'Php 200.00',
      priceNum: 200.0,
      image: 'Cheese Burger.webp'
    },
    {
      id: 2,
      name: 'Barbecue Burger',
      description: 'Barbecue patty, bacon, BBQ sauce',
      price: 'Php 359.00',
      priceNum: 359.0,
      image: 'Barbecue.jpg'
    },
    {
      id: 3,
      name: 'Ultimate Combo',
      description: 'Big patty, bacon, fries (good for 2 person)',
      price: 'Php 450.00',
      priceNum: 450.0,
      image: 'Burger with fries.jpg'
    },
    {
      id: 4,
      name: 'Vegetarian Burger',
      description: 'Vegetable patty with veggies',
      price: 'Php 219.00',
      priceNum: 219.0,
      image: 'Burger Veggies.jpg'
    },
    {
      id: 5,
      name: 'Vegets',
      description: 'This Burger has veggies, patties, nuggets',
      price: 'Php 319.00',
      priceNum: 319.0,
      image: 'veggie Nuggets.jpg'
    },
    {
      id: 6,
      name: 'ChickBurg',
      description: 'This Burger has veggies, fried chicken, and some veggies',
      price: 'Php 350.00',
      priceNum: 350.0,
      image: 'Chicken Burger.jpg'
    },
    {
      id: 7,
      name: 'French Fries',
      description: 'Crispy golden fries',
      price: 'Php 107.00',
      priceNum: 107.0,
      image: 'Frenchfries.jpg'
    },
    {
      id: 8,
      name: 'Soda',
      description: 'Refreshing carbonated drink',
      price: 'Php 75.00',
      priceNum: 75.0,
      image: 'Coke.jpg'
    },
    {
      id: 9,
      name: 'Milkshake',
      description: 'Creamy vanilla milkshake',
      price: 'Php 350.00',
      priceNum: 350.0,
      image: 'Chocolate shake.jpg'
    },
    {
      id: 10,
      name: 'Giant Burger',
      description: 'Big Giant Burger',
      price: 'Php 10,000.00',
      priceNum: 10000.0,
      image: 'Giant Burger.jpg'
    },
    {
      id: 11,
      name: 'Big Patty Burger',
      description: 'Extra large patty with all the fixings',
      price: 'Php 350.00',
      priceNum: 350.0,
      image: 'Big Patty burger.jpg'
    },
    {
      id: 12,
      name: 'Steak Burger',
      description: 'Grilled steak patty with all the fixings',
      price: 'Php 450.00',
      priceNum: 450.0,
      image: 'steak burger.jpg'
    }
  ];

  return (
    <section>
      <h2>All Products</h2>

      <div className="products">
        {products.map(product => (
          <article key={product.id} className="product">
            <img src={`/burgershop/${product.image}`} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p className="price">{product.price}</p>
            <button
              className="btn add-to-cart"
              onClick={() => {
                addItem({ id: product.id, name: product.name, price: product.priceNum });
                alert(product.name + ' added to cart!');
              }}
            >
              Add to Cart
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
