import { useState } from 'react';
import {
  BrowserRouter,
  Link,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { CartProvider, useCart, AuthProvider, useAuth } from './store.jsx';
import { categories, dishes, findDish } from './menu.js';

function Header() {
  const { count } = useCart();
  const { user, signOut } = useAuth();

  return (
    <header className="site-header">
      <Link className="brand" to="/" aria-label="Addis Eats home">
        <span className="brand-mark">A</span>
        <span>Addis<span className="brand-light">Eats</span></span>
      </Link>
      <nav className="main-nav" aria-label="Main navigation">
        <Link to="/">Menu</Link>
        <Link className="cart-link" to="/cart">
          Basket <span className="cart-count">{count}</span>
        </Link>
      </nav>
      <div className="account-nav">
        {user ? (
          <>
            <span className="account-email">{user}</span>
            <button className="text-button" onClick={signOut} type="button">Sign out</button>
          </>
        ) : (
          <Link className="sign-in-link" to="/signin">Sign in</Link>
        )}
      </div>
    </header>
  );
}

function Layout() {
  return (
    <div className="app-shell">
      <Header />
      <Outlet />
      <footer className="site-footer">
        <span>Made with care in Addis Ababa</span>
        <span>Good food brings us together.</span>
      </footer>
    </div>
  );
}

function DishCard({ dish }) {
  const { addItem } = useCart();

  return (
    <article className="dish-card">
      <Link className="dish-photo-link" to={`/menu/${dish.id}`} aria-label={`View ${dish.name}`}>
        <img className="dish-photo" src={dish.image} alt={dish.name} loading="lazy" />
        <span className="photo-tag">{dish.tag}</span>
      </Link>
      <div className="dish-card-content">
        <div className="dish-card-heading">
          <Link className="dish-name" to={`/menu/${dish.id}`}>{dish.name}</Link>
          <span className="dish-price">{dish.price.toFixed(2)} <small>USD</small></span>
        </div>
        <p>{dish.description}</p>
        <div className="dish-card-bottom">
          <span className="dish-category">{dish.category}</span>
          <button className="add-button" type="button" onClick={() => addItem(dish.id)} aria-label={`Add ${dish.name} to basket`}>
            <span aria-hidden="true">+</span> Add
          </button>
        </div>
      </div>
    </article>
  );
}

function MenuPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category') || 'All';
  const visibleDishes = selectedCategory === 'All'
    ? dishes
    : dishes.filter((dish) => dish.category === selectedCategory);

  function selectCategory(category) {
    const nextParams = new URLSearchParams(searchParams);
    if (category === 'All') nextParams.delete('category');
    else nextParams.set('category', category);
    setSearchParams(nextParams, { replace: true });
  }

  return (
    <main>
      <section className="menu-hero">
        <div className="hero-copy">
          <p className="eyebrow">A TASTE OF HOME, DELIVERED</p>
          <h1>Gather around<br /><em>something good.</em></h1>
          <p className="hero-description">Slow-cooked classics and bright, generous plates from the heart of Addis.</p>
          <a className="hero-cta" href="#menu">Explore the menu <span aria-hidden="true">↓</span></a>
        </div>
        <div className="hero-art" aria-label="A colorful Ethiopian meal" role="img">
          <img src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1100&q=85" alt="A table full of colorful fresh food" />
          <div className="hero-stamp"><span>Fresh</span><span>from</span><strong>ADDIS</strong></div>
          <div className="hero-note">Shared plates<br />made with heart</div>
        </div>
        <div className="hero-index"><span>01</span><span className="index-line" /><span>THE MENU</span></div>
      </section>

      <section className="menu-section" id="menu">
        <div className="section-heading">
          <div>
            <p className="eyebrow">WHAT ARE YOU CRAVING?</p>
            <h2>Made to be shared.</h2>
          </div>
          <p className="section-aside">Good things take time.<br />These are worth the wait.</p>
        </div>
        <div className="category-row" aria-label="Filter menu by category">
          <span className="filter-label">FILTER</span>
          {categories.map((category) => (
            <button
              aria-pressed={selectedCategory === category}
              className={`category-button${selectedCategory === category ? ' active' : ''}`}
              key={category}
              onClick={() => selectCategory(category)}
              type="button"
            >
              {category}
            </button>
          ))}
          <span className="dish-total">{visibleDishes.length} dishes</span>
        </div>
        {visibleDishes.length ? (
          <div className="dish-grid">
            {visibleDishes.map((dish) => <DishCard dish={dish} key={dish.id} />)}
          </div>
        ) : (
          <div className="empty-filter">No dishes in this category yet.</div>
        )}
      </section>
      <section className="origin-band">
        <span className="origin-number">02 / OUR TABLE</span>
        <p>Food tastes better when<br /><em>there's room for one more.</em></p>
        <span className="origin-caption">From our kitchen to yours, with love.</span>
      </section>
    </main>
  );
}

function DishPage() {
  const { id } = useParams();
  const dish = findDish(id);
  const { addItem } = useCart();
  const navigate = useNavigate();

  if (!dish) return <NotFoundPage />;

  function handleAdd() {
    addItem(dish.id);
    navigate('/cart');
  }

  return (
    <main className="inner-page dish-detail-page">
      <Link className="back-link" to="/">← Back to menu</Link>
      <div className="dish-detail">
        <div className="detail-image-wrap">
          <img className="detail-image" src={dish.image} alt={dish.name} />
          <span className="photo-tag">{dish.tag}</span>
        </div>
        <div className="detail-copy">
          <p className="eyebrow">{dish.category.toUpperCase()} · ADDIS EATS</p>
          <h1>{dish.name}</h1>
          <p className="detail-description">{dish.longDescription}</p>
          <div className="detail-meta"><span>PREPARED FRESH</span><span>SHAREABLE PORTION</span></div>
          <div className="detail-order-row">
            <span className="detail-price">${dish.price.toFixed(2)}</span>
            <button className="primary-button" onClick={handleAdd} type="button">Add to basket <span aria-hidden="true">+</span></button>
          </div>
          <p className="detail-note">Served with care. Allergies? Please contact us before ordering.</p>
        </div>
      </div>
    </main>
  );
}

function CartPage() {
  const { items, updateQuantity, removeItem, subtotal } = useCart();

  return (
    <main className="inner-page cart-page">
      <p className="eyebrow">YOUR TABLE</p>
      <h1>Your basket<span className="heading-period">.</span></h1>
      {items.length ? (
        <div className="cart-layout">
          <div className="cart-items">
            {items.map(({ dish, quantity }) => (
              <article className="cart-item" key={dish.id}>
                <img src={dish.image} alt="" />
                <div className="cart-item-info">
                  <Link to={`/menu/${dish.id}`}>{dish.name}</Link>
                  <span>{dish.category} · ${dish.price.toFixed(2)}</span>
                  <button className="remove-button" onClick={() => removeItem(dish.id)} type="button">Remove</button>
                </div>
                <div className="quantity-control" aria-label={`Quantity of ${dish.name}`}>
                  <button aria-label={`Remove one ${dish.name}`} disabled={quantity <= 1} onClick={() => updateQuantity(dish.id, quantity - 1)} type="button">−</button>
                  <span>{quantity}</span>
                  <button aria-label={`Add one ${dish.name}`} onClick={() => updateQuantity(dish.id, quantity + 1)} type="button">+</button>
                </div>
                <strong className="line-total">${(dish.price * quantity).toFixed(2)}</strong>
              </article>
            ))}
            <Link className="continue-link" to="/">← Continue exploring</Link>
          </div>
          <aside className="order-summary">
            <p className="eyebrow">A LITTLE BREAKDOWN</p>
            <h2>Order summary</h2>
            <div className="summary-row"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="summary-row"><span>Delivery</span><span className="free-delivery">On us</span></div>
            <div className="summary-total"><span>Total</span><strong>${subtotal.toFixed(2)}</strong></div>
            <Link className="primary-button checkout-button" to="/checkout">Continue to checkout <span aria-hidden="true">→</span></Link>
            <p className="summary-note">Delivery fee on us for this first order.</p>
          </aside>
        </div>
      ) : (
        <div className="empty-state">
          <span className="empty-icon" aria-hidden="true">○</span>
          <h2>Your basket is taking a breather.</h2>
          <p>Find something delicious and bring it along.</p>
          <Link className="primary-button" to="/">Browse the menu <span aria-hidden="true">→</span></Link>
        </div>
      )}
    </main>
  );
}

function SignInPage() {
  const { user, signIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const destination = location.state?.from
    ? `${location.state.from.pathname}${location.state.from.search || ''}`
    : '/checkout';

  if (user) return <Navigate to={destination} replace />;

  function handleSubmit(event) {
    event.preventDefault();
    const normalizedEmail = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setError('Enter a valid email address to continue.');
      return;
    }
    signIn(normalizedEmail);
    navigate(destination, { replace: true });
  }

  return (
    <main className="inner-page sign-in-page">
      <section className="sign-in-panel">
        <p className="eyebrow">ONE LAST THING</p>
        <h1>Come on in<span className="heading-period">.</span></h1>
        <p className="sign-in-intro">Sign in to finish placing your order. We'll bring you right back to checkout.</p>
        <form className="sign-in-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email address</label>
          <input autoComplete="email" id="email" onChange={(event) => { setEmail(event.target.value); setError(''); }} placeholder="you@example.com" type="email" value={email} />
          {error && <p className="form-error" role="alert">{error}</p>}
          <button className="primary-button" type="submit">Continue to checkout <span aria-hidden="true">→</span></button>
        </form>
        <p className="demo-note">For this demo, entering an email signs you in locally.</p>
      </section>
      <div className="sign-in-aside">
        <span className="aside-quote-mark">“</span>
        <p>Pull up a chair.<br /><em>There's always enough.</em></p>
        <span className="aside-byline">THE ADDIS EATS TABLE</span>
      </div>
    </main>
  );
}

function RequireAuth() {
  const { user } = useAuth();
  const location = useLocation();
  return user ? <CheckoutPage /> : <Navigate to="/signin" state={{ from: location }} replace />;
}

function CheckoutPage() {
  const { user } = useAuth();
  const { items, subtotal, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);

  function placeOrder(event) {
    event.preventDefault();
    clearCart();
    setOrderPlaced(true);
  }

  if (orderPlaced) {
    return (
      <main className="inner-page confirmation-page">
        <span className="confirmation-check">✓</span>
        <p className="eyebrow">ORDER RECEIVED</p>
        <h1>Thank you<span className="heading-period">.</span></h1>
        <p>Your meal is being prepared. We'll send the details to {user}.</p>
        <Link className="primary-button" to="/">Back to the menu <span aria-hidden="true">→</span></Link>
      </main>
    );
  }

  if (!items.length) {
    return (
      <main className="inner-page empty-checkout">
        <p className="eyebrow">CHECKOUT</p>
        <h1>Nothing to check out yet.</h1>
        <p>Your basket is empty. Add a dish and come back when you're ready.</p>
        <Link className="primary-button" to="/">Browse the menu <span aria-hidden="true">→</span></Link>
      </main>
    );
  }

  return (
    <main className="inner-page checkout-page">
      <p className="eyebrow">ALMOST AT YOUR TABLE</p>
      <h1>Checkout<span className="heading-period">.</span></h1>
      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={placeOrder}>
          <p className="signed-in-as">Signed in as <strong>{user}</strong></p>
          <h2>Where should we bring it?</h2>
          <label htmlFor="address">Delivery address</label>
          <input autoComplete="street-address" id="address" placeholder="Street and house number" required />
          <div className="checkout-input-row">
            <div><label htmlFor="city">Neighborhood</label><input id="city" placeholder="e.g. Bole" required /></div>
            <div><label htmlFor="phone">Phone number</label><input autoComplete="tel" id="phone" placeholder="+251 ..." required type="tel" /></div>
          </div>
          <h2 className="payment-heading">Payment</h2>
          <label className="payment-choice"><input defaultChecked name="payment" type="radio" value="cash" /><span><strong>Cash on delivery</strong><small>Pay when your meal arrives</small></span></label>
          <button className="primary-button place-order-button" type="submit">Place order · ${subtotal.toFixed(2)} <span aria-hidden="true">→</span></button>
        </form>
        <aside className="checkout-summary">
          <p className="eyebrow">IN YOUR BASKET</p>
          {items.map(({ dish, quantity }) => (
            <div className="checkout-line" key={dish.id}><span>{quantity} × {dish.name}</span><strong>${(dish.price * quantity).toFixed(2)}</strong></div>
          ))}
          <div className="summary-total"><span>Total</span><strong>${subtotal.toFixed(2)}</strong></div>
        </aside>
      </div>
    </main>
  );
}

function NotFoundPage() {
  return (
    <main className="inner-page not-found-page">
      <p className="eyebrow">THIS TABLE IS EMPTY</p>
      <h1>We can't find that page<span className="heading-period">.</span></h1>
      <p>It may have moved, or perhaps it was never on the menu.</p>
      <Link className="primary-button" to="/">Return to the menu <span aria-hidden="true">→</span></Link>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<MenuPage />} />
              <Route path="menu/:id" element={<DishPage />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="signin" element={<SignInPage />} />
              <Route path="checkout" element={<RequireAuth />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
