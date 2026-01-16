import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProductDetail.css";
import Reviews from "./Reviews"

const API = "http://localhost:5000/api/buy";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);
  const [cart, setCart] = useState([]);
  
  // 🆕 QUANTITY STATE - This was missing!
  const [quantity, setQuantity] = useState(1);

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${API}/product/${id}`);
        setProduct(res.data);
        setCurrentImage(0);
        setQuantity(res.data?.minOrder || 1); // Reset quantity
      } catch (err) {
        console.error("Product fetch error:", err);
        setProduct({
          _id: id,
          cropName: "Assam Orthodox Tea",
          description: "Premium orthodox tea from the finest estates in Assam.",
          price: 160,
          unit: "100g",
          quantity: 50,
          minOrder: 1,
          city: "Jorhat",
          state: "Assam",
          variety: "Orthodox",
          organic: "yes",
          harvestDate: "2026-01-10",
          mobile: "07099774852",
          images: [
            "https://images.unsplash.com/photo-1613769049987-48878e4ddaf1?w=500",
            "https://images.unsplash.com/photo-1576091160399-1d65cdaa8782?w=500"
          ]
        });
        setQuantity(1);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Load cart
  useEffect(() => {
    const savedCart = localStorage.getItem('farmCart');
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  // 🆕 WORKING QUANTITY HANDLERS
  const handleQtyDecrease = () => {
    if (quantity > (product?.minOrder || 1)) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleQtyIncrease = () => {
    if (quantity < (product?.quantity || 50)) {
      setQuantity(prev => prev + 1);
    }
  };

  const addToCart = (item) => {
    const itemWithQty = { ...item, quantity };
    const existingItem = cart.find(c => c._id === item._id);
    let updatedCart;
    
    if (existingItem) {
      updatedCart = cart.map(c =>
        c._id === item._id ? { ...c, quantity: c.quantity + quantity } : c
      );
    } else {
      updatedCart = [...cart, itemWithQty];
    }
    
    setCart(updatedCart);
    localStorage.setItem('farmCart', JSON.stringify(updatedCart));
  };

  const buyNow = () => {
    const itemWithQty = { ...product, quantity };
    const updatedCart = [itemWithQty]; // Clear cart, add only this item
    setCart(updatedCart);
    localStorage.setItem('farmCart', JSON.stringify(updatedCart));
    navigate('/cart');
  };

  if (loading) {
    return <div className="detail-loading">Loading product details...</div>;
  }

  if (!product) {
    return <div className="detail-error">Product not found</div>;
  }

  return (
    <div className="product-detail-page">
      <div className="detail-container">
        {/* BREADCRUMBS */}
        <div className="breadcrumbs">
          <a href="/tea">Tea</a> / <span>{product.cropName}</span>
        </div>

        <div className="detail-main">
          {/* IMAGE SECTION */}
          <div className="image-section">
            <div className="main-image">
              <img 
                src={product.images?.[currentImage] || "https://via.placeholder.com/500?text=No+Image"} 
                alt={product.cropName}
              />
            </div>
            <div className="image-thumbnails">
              {product.images?.map((img, idx) => (
                <img 
                  key={idx}
                  src={img}
                  alt={`${product.cropName} ${idx + 1}`}
                  className={currentImage === idx ? "active" : ""}
                  onClick={() => setCurrentImage(idx)}
                />
              ))}
            </div>
          </div>

          {/* DETAILS SECTION */}
          <div className="details-section">
            <h1 className="product-title">{product.cropName}</h1>
            <div className="variety-badge">{product.variety}</div>
            
            <div className="price-section">
              <span className="price">₹{product.price}</span>
              <span className="unit">/{product.unit}</span>
              {product.organic === "yes" && (
                <span className="organic-badge">🌿 Organic</span>
              )}
              {/* 🆕 TOTAL PRICE */}
              <div className="total-price-display">
                Total: ₹{(product.price * quantity).toLocaleString()}
              </div>
            </div>

            <div className="product-meta">
              <div className="meta-item">
                <span className="meta-label">Harvest Date:</span>
                <span>{new Date(product.harvestDate).toLocaleDateString()}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Origin:</span>
                <span>{product.city}, {product.state}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Farmer:</span>
                <span>{product.mobile}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Stock:</span>
                <span>{product.quantity}{product.unit} available</span>
              </div>
            </div>

            {/* 🆕 WORKING QUANTITY SECTION */}
            <div className="quantity-section">
              <label>Quantity:</label>
              <div className="qty-input-group">
                <button 
                  className="qty-btn" 
                  onClick={handleQtyDecrease}
                  disabled={quantity <= (product?.minOrder || 1)}
                >
                  -
                </button>
                <input 
                  type="number" 
                  value={quantity}
                  min={product.minOrder} 
                  max={product.quantity}
                  onChange={(e) => setQuantity(Math.max(product.minOrder, Math.min(product.quantity, parseInt(e.target.value) || 1)))}
                />
                <button 
                  className="qty-btn" 
                  onClick={handleQtyIncrease}
                  disabled={quantity >= (product?.quantity || 50)}
                >
                  +
                </button>
              </div>
              <small>Min order: {product.minOrder}{product.unit} | Max: {product.quantity}{product.unit}</small>
            </div>

            <div className="action-buttons">
              <button className="buy-now-btn" onClick={buyNow}>
                🚀 Buy Now (₹{(product.price * quantity).toLocaleString()})
              </button>
              <button className="add-cart-btn" onClick={() => addToCart(product)}>
                🛒 Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="description-section">
          <h2>About this Tea</h2>
          <p>{product.description || "Premium quality tea directly from Assam farms. Freshly harvested and packed with natural goodness."}</p>
        </div>

        {/* REVIEWS SECTION */}
        <Reviews productId={id} />
      </div>
    </div>
  );
}
