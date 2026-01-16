import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState({
    name: '',
    phone: '',
    street: '',
    city: 'Sibsagar',
    state: 'Assam',
    pincode: '785640'
  });
  const [deliveryDate, setDeliveryDate] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const syncCart = () => {
      const savedCart = localStorage.getItem('farmCart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      } else {
        setCart([]);
      }
    };

    syncCart();
    window.addEventListener('storage', syncCart);
    const interval = setInterval(syncCart, 500);

    return () => {
      window.removeEventListener('storage', syncCart);
      clearInterval(interval);
    };
  }, []);

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    
    setCart(prev => {
      const updated = prev.map(item => item._id === id ? { ...item, quantity } : item);
      localStorage.setItem('farmCart', JSON.stringify(updated));
      return updated;
    });
  };

  const removeItem = (id) => {
    const updated = cart.filter(item => item._id !== id);
    setCart(updated);
    localStorage.setItem('farmCart', JSON.stringify(updated));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('farmCart');
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const gst = subtotal * 0.05; // 5% GST
  const delivery = 50;
  const totalAmount = subtotal + gst + delivery;
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleContinueShopping = () => navigate(-1);

  const nextDeliveryDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 2);
    const formatted = today.toISOString().split('T')[0];
    setDeliveryDate(formatted);
  };

  useEffect(() => {
    nextDeliveryDate();
  }, []);

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-header">
          <div>
            <h1>🛒 Shopping Cart</h1>
            <span className="cart-count">{totalItems} items</span>
          </div>
          <button onClick={handleContinueShopping} className="back-button">
            ← Continue Shopping
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-icon">🛒</div>
            <h3>Your cart is empty</h3>
            <p>Add fresh produce from local farms to get started</p>
            <button onClick={handleContinueShopping} className="shop-button">
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="cart-main-content">
            {/* ITEMS LIST */}
            <div className="cart-items-section">
              <div className="section-header">
                <h2>Items ({totalItems})</h2>
              </div>
              <div className="cart-items">
                {cart.map(item => (
                  <div key={item._id} className="cart-item">
                    <img 
                      src={item.images?.[0] || "https://via.placeholder.com/80?text=?"} 
                      alt={item.cropName} 
                      className="item-image"
                    />
                    <div className="item-info">
                      <h3>{item.cropName}</h3>
                      <p className="item-price">₹{item.price}/{item.unit || 'kg'}</p>
                      <p className="item-location">{item.city}, {item.state}</p>
                    </div>
                    
                    <div className="quantity-control">
                      <button 
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        className="qty-button"
                      >-</button>
                      <span className="qty-number">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        className="qty-button"
                      >+</button>
                    </div>
                    
                    <div className="item-total">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </div>
                    
                    <button 
                      className="delete-button"
                      onClick={() => removeItem(item._id)}
                    >×</button>
                  </div>
                ))}
              </div>
            </div>

            {/* CHECKOUT SUMMARY */}
            <div className="checkout-section">
              <div className="delivery-info">
                <h3>📦 Delivery Details</h3>
                <div className="address-form">
                  <input 
                    placeholder="Full Name" 
                    value={address.name}
                    onChange={(e) => setAddress({...address, name: e.target.value})}
                    className="address-input"
                  />
                  <input 
                    placeholder="Phone Number" 
                    value={address.phone}
                    onChange={(e) => setAddress({...address, phone: e.target.value})}
                    className="address-input"
                  />
                  <input 
                    placeholder="Street Address" 
                    value={address.street}
                    onChange={(e) => setAddress({...address, street: e.target.value})}
                    className="address-input"
                  />
                  <div className="address-row">
                    <input 
                      placeholder="City" 
                      value={address.city}
                      onChange={(e) => setAddress({...address, city: e.target.value})}
                      className="address-input small"
                    />
                    <input 
                      placeholder="Pincode" 
                      value={address.pincode}
                      onChange={(e) => setAddress({...address, pincode: e.target.value})}
                      className="address-input small"
                    />
                  </div>
                </div>
                <div className="delivery-date">
                  <label>Expected Delivery:</label>
                  <span className="date-display">{deliveryDate || 'Loading...'}</span>
                </div>
              </div>

              <div className="price-summary">
                <h3>Price Details</h3>
                <div className="price-row">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="price-row">
                  <span>GST (5%)</span>
                  <span>₹{gst.toLocaleString()}</span>
                </div>
                <div className="price-row">
                  <span>Delivery Charges</span>
                  <span>₹{delivery.toLocaleString()}</span>
                </div>
                <div className="price-row total-row">
                  <span>Total Amount</span>
                  <span className="total-price">₹{totalAmount.toLocaleString()}</span>
                </div>
              </div>

              <div className="cart-actions">
                <button onClick={clearCart} className="clear-button">
                  Clear Cart
                </button>
                <button className="checkout-button">
                  PLACE ORDER → ₹{totalAmount.toLocaleString()}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
