
import { useState } from "react";
import "./App.css";

const products = [
  {
    id: 1,
    name: "Floral Anarkali",
    category: "Traditional",
    price: 2499,
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=700",
  },
  {
    id: 2,
    name: "Elegant Summer Dress",
    category: "Casual",
    price: 1599,
    image:
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=700",
  },
  {
    id: 3,
    name: "Evening Party Dress",
    category: "Party",
    price: 3299,
    image:
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=700",
  },
  
  {
  id: 4,
  name: "Classic Ethnic Wear",
  category: "Traditional",
  price: 2199,
  image:
    "https://images.pexels.com/photos/28512766/pexels-photo-28512766/free-photo-of-elegant-indian-traditional-wear-in-sunlight.jpeg?auto=compress&dpr=1&h=750&w=1260",
  },
  {
    id: 5,
    name: "Casual Chic Outfit",
    category: "Casual",
    price: 1899,
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=700",
  },
  {
    id: 6,
    name: "Luxury Party Outfit",
    category: "Party",
    price: 3999,
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=700",
  },
];

function App() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [message, setMessage] = useState("");

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      category === "All" || product.category === category;

    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  function addToCart(product) {
    setCart((previousCart) => {
      const existing = previousCart.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return previousCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...previousCart, { ...product, quantity: 1 }];
    });

    setMessage(`${product.name} added to cart!`);

    setTimeout(() => setMessage(""), 2000);
  }

  function updateQuantity(id, amount) {
    setCart((previousCart) =>
      previousCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="website">

      {/* Navigation */}
      <header className="navbar">
        <a href="#home" className="logo">
          Luna<span> Boutique</span>
        </a>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          ☰
        </button>

        <nav className={menuOpen ? "nav-links active" : "nav-links"}>
          <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#collections" onClick={() => setMenuOpen(false)}>Collections</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>

        <button
          className="cart-button"
          onClick={() => setCartOpen(!cartOpen)}
        >
          🛍 Cart ({cartCount})
        </button>
      </header>

      {/* Shopping Cart */}
      {cartOpen && (
        <div className="cart-panel">
          <div className="cart-heading">
            <h2>Your Shopping Cart</h2>
            <button onClick={() => setCartOpen(false)}>✕</button>
          </div>

          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div>
                    <h4>{item.name}</h4>
                    <p>₹{item.price.toLocaleString("en-IN")}</p>
                  </div>

                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(item.id, -1)}>
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button onClick={() => updateQuantity(item.id, 1)}>
                      +
                    </button>
                  </div>
                </div>
              ))}

              <h3 className="cart-total">
                Total: ₹{cartTotal.toLocaleString("en-IN")}
              </h3>

              <button
                className="checkout-button"
                onClick={() =>
                  alert("Thank you for visiting Luna Boutique! Online checkout is not yet available.")
                }
              >
                Proceed to Checkout
              </button>
            </>
          )}
        </div>
      )}

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-content">
          <p className="eyebrow">WELCOME TO LUNA BOUTIQUE</p>

          <h1>
            Elegance is
            <br />
            Always in Style.
          </h1>

          <p>
            Discover beautiful outfits that express
            your personality and make every moment special.
          </p>

          <a href="#collections" className="primary-button">
            Explore Collection
          </a>
        </div>
      </section>

      {/* About Section */}
      <section className="about section" id="about">
        <div className="about-image">
          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900"
            alt="Fashion boutique collection"
          />
        </div>

        <div className="about-content">
          <p className="eyebrow">OUR STORY</p>

          <h2>Fashion That Speaks Your Style</h2>

          <p>
            Welcome to Luna Boutique, where elegance meets
            everyday fashion. We believe every individual
            deserves to feel confident and beautiful.
          </p>

          <p>
            From traditional outfits to modern collections,
            discover styles that make every occasion memorable.
          </p>

          <a href="#collections" className="text-link">
            Discover More →
          </a>
        </div>
      </section>

      {/* Collections */}
      <section className="collections section" id="collections">
        <div className="section-heading">
          <p className="eyebrow">OUR COLLECTION</p>
          <h2>Find Your Perfect Style</h2>
          <p>Explore our handpicked fashion collection.</p>
        </div>

        {/* Search */}
        <input
          type="text"
          className="search-input"
          placeholder="Search for an outfit..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        {/* Category Filters */}
        <div className="filter-buttons">
          {["All", "Traditional", "Casual", "Party"].map((item) => (
            <button
              key={item}
              className={category === item ? "filter active" : "filter"}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Product Cards */}
        <div className="product-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div className="product-card" key={product.id}>
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                </div>

                <div className="product-info">
                  <span>{product.category}</span>
                  <h3>{product.name}</h3>

                  <div className="product-bottom">
                    <p>₹{product.price.toLocaleString("en-IN")}</p>

                    <button onClick={() => addToCart(product)}>
                      Add +
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="no-products">No matching products found.</p>
          )}
        </div>
      </section>

      {/* Promotional Section */}
      <section className="promo">
        <p>STYLE • ELEGANCE • CONFIDENCE</p>
        <h2>Make Every Moment Beautiful</h2>
        <a href="#collections" className="primary-button">
          Shop Now
        </a>
      </section>

      {/* Contact Section */}
      <section className="contact section" id="contact">
        <div className="section-heading">
          <p className="eyebrow">GET IN TOUCH</p>
          <h2>We'd Love to Hear From You</h2>
        </div>

        <div className="contact-details">
          <div>
            <span>📍</span>
            <h3>Visit Us</h3>
            <p>Bengaluru, Karnataka, India</p>
          </div>

          <div>
            <span>✉️</span>
            <h3>Email Us</h3>
            <p>hello@lunaboutique.example</p>
          </div>

          <div>
            <span>💬</span>
            <h3>WhatsApp</h3>
            <p>Contact us for enquiries</p>
            <a
              href="https://wa.me/910000000000"
              target="_blank"
              rel="noreferrer"
              className="text-link"
            >
              Message Us →
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <h2>Luna Boutique</h2>
        <p>Elegance begins with you.</p>

        <div className="footer-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#collections">Collections</a>
          <a href="#contact">Contact</a>
        </div>

        <p className="copyright">
          © 2026 Luna Boutique. All rights reserved.
        </p>
      </footer>

      {/* Notification */}
      {message && (
        <div className="notification" role="status">
          {message}
        </div>
      )}

    </div>
  );
}

export default App;
