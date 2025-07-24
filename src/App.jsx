import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './context/CartContext';
import { SearchProvider } from './context/SearchContext';
import { AuthProvider } from './context/AuthContext';
import { OrderProvider } from './context/OrderContext';

// Layouts
import AdminLayout from './layouts/AdminLayout';
import Navbar from './components/Navbar';

// Admin Pages
import Dashboard from './pages/admin/Dashboard';
import OrderDetails from './pages/admin/OrderDetails';
import AdminLogin from './pages/admin/Login';
import AdminOrders from './pages/admin/Orders';
import AdminProducts from './pages/admin/Products';
import AdminUsers from './pages/admin/Users';
import Settings from './pages/admin/Settings';
import Analytics from './pages/admin/Analytics';

// Public Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderHistory from './pages/OrderHistory';
import Bestsellers from './pages/Bestsellers';
import GiftSets from './pages/GiftSets';
import About from './pages/About';
import ContactSupport from './pages/ContactSupport';
import MeetTeam from './pages/MeetTeam';
import CleanIngredients from './pages/CleanIngredients';
import PerfumeGuide from './pages/PerfumeGuide';
import AffiliateProgram from './pages/creator/AffiliateProgram';

// Auth Pages
import Login from './pages/Login';
import Register from './pages/Register';

// Wrapper component to conditionally render Navbar
const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      <Toaster position="top-right" />
      {!isAdminRoute && <Navbar />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<OrderHistory />} />
        
        {/* Shop Categories */}
        <Route path="/shop/mens" element={<Shop />} />
        <Route path="/shop/womens" element={<Shop />} />
        <Route path="/shop/sugar" element={<Shop />} />
        <Route path="/perfume-guide" element={<PerfumeGuide />} />
        
        {/* Bestsellers */}
        <Route path="/bestsellers" element={<Bestsellers />} />
        
        {/* Gift Sets */}
        <Route path="/gift-sets" element={<GiftSets />} />
        <Route path="/gift-sets/luxury" element={<GiftSets />} />
        <Route path="/gift-sets/discovery" element={<GiftSets />} />
        <Route path="/gift-sets/occasions" element={<GiftSets />} />
        <Route path="/gift-sets/custom" element={<GiftSets />} />
        
        {/* Creator Zone */}
        <Route path="/creator/affiliate" element={<AffiliateProgram />} />
        
        {/* Contact & Info */}
        <Route path="/contact-support" element={<ContactSupport />} />
        <Route path="/meet-team" element={<MeetTeam />} />
        <Route path="/clean-ingredients" element={<CleanIngredients />} />
        <Route path="/about" element={<About />} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="orders/:orderId" element={<OrderDetails />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="settings" element={<Settings />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <SearchProvider>
          <CartProvider>
            <OrderProvider>
              <AppContent />
            </OrderProvider>
          </CartProvider>
        </SearchProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;