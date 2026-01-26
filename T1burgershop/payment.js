function handlePaymentForm() {
  var form = document.getElementById("paymentForm");
  if (!form) return;

  
  var deliveryRadios = document.querySelectorAll('input[name="delivery"]');
  deliveryRadios.forEach(function(radio) {
    radio.addEventListener('change', function() {
      var deliveryAddress = document.getElementById('delivery-address');
      if (this.value === 'delivery') {
        deliveryAddress.style.display = 'block';
      } else {
        deliveryAddress.style.display = 'none';
      }
      updateOrderSummary();
    });
  });

  
  var paymentRadios = document.querySelectorAll('input[name="payment"]');
  paymentRadios.forEach(function(radio) {
    radio.addEventListener('change', function() {
      var cardDetails = document.getElementById('card-details');
      var paypalDetails = document.getElementById('paypal-details');
      cardDetails.style.display = 'none';
      paypalDetails.style.display = 'none';
      if (this.value === 'card') {
        cardDetails.style.display = 'block';
      } else if (this.value === 'paypal') {
        paypalDetails.style.display = 'block';
      }
    });
  });

  form.addEventListener("submit", function(e) {
    e.preventDefault();


    var deliveryOption = document.querySelector('input[name="delivery"]:checked').value;
    var paymentOption = document.querySelector('input[name="payment"]:checked').value;

    if (deliveryOption === 'delivery' && !document.getElementById('address').value.trim()) {
      alert('Please enter a delivery address.');
      return;
    }

    if (paymentOption === 'card') {
      var cardNumber = document.getElementById('cardNumber').value.trim();
      var expiry = document.getElementById('expiry').value.trim();
      var cvv = document.getElementById('cvv').value.trim();
      var cardName = document.getElementById('cardName').value.trim();

      if (!cardNumber || !expiry || !cvv || !cardName) {
        alert('Please fill in all card details.');
        return;
      }
    }


    alert('Processing payment...');
    setTimeout(function() {
      window.location.href = 'confirmation.html';
    }, 2000);
  });
}

function updateOrderSummary() {
  var deliveryOption = document.querySelector('input[name="delivery"]:checked').value;
  var subtotal = 450.00; // This should be calculated from cart
  var deliveryCost = deliveryOption === 'delivery' ? 50.00 : 0.00;
  var total = subtotal + deliveryCost;

  var summaryElement = document.querySelector('.order-summary');
  if (summaryElement) {
    summaryElement.innerHTML = `
      <h3>Order Summary</h3>
      <p>Subtotal: Php ${subtotal.toFixed(2)}</p>
      <p>Delivery: Php ${deliveryCost.toFixed(2)}</p>
      <p><strong>Total: Php ${total.toFixed(2)}</strong></p>
    `;
  }
}

document.addEventListener('DOMContentLoaded', function() {
  handlePaymentForm();
});