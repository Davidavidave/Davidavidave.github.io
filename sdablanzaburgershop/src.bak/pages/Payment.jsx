import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

export default function Payment() {
  const { cart, total, clearCart } = useContext(CartContext);
  const [delivery, setDelivery] = useState('pickup');
  const [payment, setPayment] = useState('cash');
  const [address, setAddress] = useState('');
  const [card, setCard] = useState({ cardNumber: '', expiry: '', cardName: '', cvv: '' });
  const navigate = useNavigate();

  const deliveryCost = delivery === 'delivery' ? 50 : 0;
  const grandTotal = total + deliveryCost;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (delivery === 'delivery' && !address.trim()) {
      alert('Please enter a delivery address.');
      return;
    }
    if (payment === 'card') {
      if (!card.cardNumber || !card.expiry || !card.cvv || !card.cardName) {
        alert('Please fill in all card details.');
        return;
      }
    }

    alert('Processing payment...');
    setTimeout(() => {
      clearCart();
      navigate('/confirmation');
    }, 2000);
  };

  return (
    <section>
      <h2>Payment & Delivery Options</h2>

      <section className="payment-delivery">
        <form id="paymentForm" onSubmit={handleSubmit}>
          <div className="form-section">
            <h3>Delivery Options</h3>
            <div className="radio-group">
              <label>
                <input type="radio" name="delivery" value="pickup" checked={delivery === 'pickup'} onChange={() => setDelivery('pickup')} />
                Pickup at Store (Free)
              </label>
              <label>
                <input type="radio" name="delivery" value="delivery" checked={delivery === 'delivery'} onChange={() => setDelivery('delivery')} />
                Home Delivery (Php 50.00)
              </label>
            </div>

            {delivery === 'delivery' && (
              <div id="delivery-address">
                <label htmlFor="address">Delivery Address:</label>
                <textarea id="address" name="address" rows="3" placeholder="Enter your full delivery address" value={address} onChange={e => setAddress(e.target.value)} />
              </div>
            )}
          </div>

          <div className="form-section">
            <h3>Payment Method</h3>
            <div className="radio-group">
              <label>
                <input type="radio" name="payment" value="cash" checked={payment === 'cash'} onChange={() => setPayment('cash')} />
                Cash on Delivery/Pickup
              </label>
              <label>
                <input type="radio" name="payment" value="card" checked={payment === 'card'} onChange={() => setPayment('card')} />
                Credit/Debit Card
              </label>
              <label>
                <input type="radio" name="payment" value="paypal" checked={payment === 'paypal'} onChange={() => setPayment('paypal')} />
                PayPal
              </label>
            </div>

            {payment === 'card' && (
              <div id="card-details">
                <label htmlFor="cardNumber">Card Number:</label>
                <input type="text" id="cardNumber" name="cardNumber" placeholder="" value={card.cardNumber} onChange={e => setCard({ ...card, cardNumber: e.target.value })} />

                <label htmlFor="expiry">Expiry Date:</label>
                <input type="text" id="expiry" name="expiry" placeholder="MM/YY" value={card.expiry} onChange={e => setCard({ ...card, expiry: e.target.value })} />

                <label htmlFor="cardName">Name on Card:</label>
                <input type="text" id="cardName" name="cardName" placeholder="" value={card.cardName} onChange={e => setCard({ ...card, cardName: e.target.value })} />

                <label htmlFor="cvv">CVV:</label>
                <input type="text" id="cvv" name="cvv" placeholder="" value={card.cvv} onChange={e => setCard({ ...card, cvv: e.target.value })} />
              </div>
            )}
          </div>

          <div className="order-summary">
            <h3>Order Summary</h3>
            <p>Subtotal: Php {total.toFixed(2)}</p>
            <p>Delivery: Php {deliveryCost.toFixed(2)}</p>
            <p><strong>Total: Php {grandTotal.toFixed(2)}</strong></p>
          </div>

          <button type="submit" className="btn">Complete Order</button>
        </form>
      </section>
    </section>
  );
}

