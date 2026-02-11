import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

export default function Cart() {
  const { cart, updateQty, removeItem, total } = useContext(CartContext);

  return (
    <section>
      <h2>Shopping Cart</h2>

      <section className="cart">
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <table className="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{typeof item.price === 'number' ? `Php ${item.price.toFixed(2)}` : item.price}</td>
                  <td>
                    <input
                      className="quantity"
                      type="number"
                      min="0"
                      value={item.qty || 0}
                      onChange={e => updateQty(item.id, e.target.value)}
                    />
                  </td>
                  <td>{`Php ${((item.price || 0) * (item.qty || 0)).toFixed(2)}`}</td>
                  <td>
                    <button className="remove-btn" onClick={() => removeItem(item.id)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="cart-total">
          <p><strong>Total: Php {total.toFixed(2)}</strong></p>
          <Link to="/payment" className="btn checkout-btn">Proceed to Checkout</Link>
        </div>
      </section>
    </section>
  );
}



