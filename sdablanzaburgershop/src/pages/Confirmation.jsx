import React from 'react';
import { Link } from 'react-router-dom';

export default function Confirmation() {
  return (
    <section>
      <h2>Order Confirmation</h2>

      <section className="confirmation">
        <div className="confirmation-header">
          <h3>Thank you for your order!</h3>
          <p>Your order has been successfully placed.</p>
        </div>

        <div className="receipt">
          <h3>E-Receipt</h3>
          <div className="receipt-details">
            <p><strong>Order Number:</strong> #DB0129</p>
            <p><strong>Order Date:</strong> January 26, 2026</p>
            <p><strong>Customer:</strong> Dave d great</p>
          </div>

          <table className="receipt-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Cheesy Goodness Burger</td>
                <td>1</td>
                <td>Php 200.00</td>
                <td>Php 200.00</td>
              </tr>
              <tr>
                <td>French Fries</td>
                <td>2</td>
                <td>Php 107.00</td>
                <td>Php 214.00</td>
              </tr>
              <tr>
                <td>Soda</td>
                <td>1</td>
                <td>Php 75.00</td>
                <td>Php 75.00</td>
              </tr>
            </tbody>
          </table>

          <div className="receipt-summary">
            <p>Subtotal: Php 489.00</p>
            <p>Delivery: Php 50.00</p>
            <p><strong>Total: Php 539.00</strong></p>
          </div>

          <div className="delivery-info">
            <h4>Delivery Information</h4>
            <p><strong>Method:</strong> Home Delivery</p>
            <p><strong>Address:</strong> 123 Puregold Kalentong</p>
            <p><strong>Estimated Delivery:</strong> January 26, 2026, 6:00 PM - 8:00 PM</p>
          </div>

          <div className="payment-info">
            <h4>Payment Information</h4>
            <p><strong>Method:</strong> Credit Card</p>
            <p><strong>Status:</strong> Paid</p>
          </div>
        </div>

        <div className="confirmation-actions">
          <Link to="/" className="btn">Continue Shopping</Link>
        </div>
      </section>
    </section>
  );
}

