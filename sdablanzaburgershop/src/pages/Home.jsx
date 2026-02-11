import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

export default function Home() {
	const { addItem } = useContext(CartContext);
	return (
		<>
			<h2>Available Burgers</h2>

			<section className="products">
				<article className="product">
					<p className="price">Best Seller</p>
					<img src="/burgershop/Cheese Burger.webp" alt="Cheesy Goodness Burger" />
					<h3>Cheesy Goodness Burger</h3>
					<p>2 patties, bacon, parmesan cheese</p>
					<p className="price">Php 200.00</p>
				<button className="btn add-to-cart" onClick={() => { addItem({ id: 1, name: 'Cheesy Goodness Burger', price: 200.0 }); alert('Cheesy Goodness Burger added to cart!'); }}>Add to Cart</button>
				</article>

				<article className="product">
					<p className="price">Best Seller</p>
					<img src="/burgershop/Giant Burger.jpg" alt="Giant Burger" />
					<h3>Giant Burger</h3>
					<p>Big Giant Burger</p>
					<p className="price">Php 10,000.00</p>
				<button className="btn add-to-cart" onClick={() => { addItem({ id: 10, name: 'Giant Burger', price: 10000.0 }); alert('Giant Burger added to cart!'); }}>Add to Cart</button>
				</article>

				<article className="product">
					<p className="price">Best Seller</p>
					<img src="/burgershop/Burger with fries.jpg" alt="Ultimate Combo" />
					<h3>Ultimate Combo</h3>
					<p>Big patty, bacon, fries (good for 2 person)</p>
					<p className="price">Php 450.00</p>
				<button className="btn add-to-cart" onClick={() => { addItem({ id: 3, name: 'Ultimate Combo', price: 450.0 }); alert('Ultimate Combo added to cart!'); }}>Add to Cart</button>
				</article>

				<article className="product">
					<img src="/burgershop/Burger Veggies.jpg" alt="Vegetarian Burger" />
					<h3>Vegetarian Burger</h3>
					<p>Vegetable patty with veggies</p>
					<p className="price">Php 219.00</p>
				<button className="btn add-to-cart" onClick={() => { addItem({ id: 4, name: 'Vegetarian Burger', price: 219.0 }); alert('Vegetarian Burger added to cart!'); }}>Add to Cart</button>
				</article>

				<article className="product">
					<img src="/burgershop/veggie Nuggets.jpg" alt="Vegetarian Burger" />
					<h3>Vegets</h3>
					<p>This Burger has veggies, patties, nuggets</p>
					<p className="price">Php 319.00</p>
				<button className="btn add-to-cart" onClick={() => { addItem({ id: 5, name: 'Vegets', price: 319.0 }); alert('Vegets added to cart!'); }}>Add to Cart</button>
				</article>

				<article className="product">
					<img src="/burgershop/Chicken Burger.jpg" alt="Vegetarian Burger" />
					<h3>ChickBurg</h3>
					<p>This Burger has veggies, fried chicken, and some veggies</p>
					<p className="price">Php 350.00</p>
				<button className="btn add-to-cart" onClick={() => { addItem({ id: 6, name: 'ChickBurg', price: 350.0 }); alert('ChickBurg added to cart!'); }}>Add to Cart</button>
				</article>

				<Link to="/products" className="btn">
					Show All <i className="fa-solid fa-arrow-right"></i>
				</Link>

			</section>
		</>
	);
}


