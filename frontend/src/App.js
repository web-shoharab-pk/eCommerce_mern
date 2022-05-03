
import { lazy, Suspense, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import WebFont from "webfontloader";
import { loadUser } from './actions/userAction';
import callApi from './API/axios';
import './App.css';
import Footer from './component/layout/Footer/Footer';
import UserOptions from './component/layout/Header//UserOptions.js';
import Navbar from './component/layout/Navbar/Navbar';
import Loader from './component/Loader/Loader';
import ProtectedRoute from './component/Route/ProtectedRoute';
import LoginSignup from './component/User/LoginSignup';
import store from './store';
const Home = lazy(() => import('./component/Home/Home'));
const ProductDetails = lazy(() => import('./component/Product/ProductDetail'))
const Products = lazy(() => import('./component/Product/Products'));
const Search = lazy(() => import('./component/Product/Search'));
const Profile = lazy(() => import('./component/User/Profile'))
const UpdateProfile = lazy(() => import('./component/User/UpdateProfile'));
const UpdatePassword = lazy(() => import('./component/User/UpdatePassword'));
const ForgotPassword = lazy(() => import('./component/User/ForgotPassword'));
const ResetPassword = lazy(() => import('./component/User/ResetPassword'));
const Cart = lazy(() => import('./component/Cart/Cart'));
const Shipping = lazy(() => import('./component/Cart/Shipping'));
const ConfirmOrder = lazy(() => import('./component/Cart/ConfirmOrder'));
const OrderSuccess = lazy(() => import('./component/Cart/OrderSuccess'));
const MyOrders = lazy(() => import('./component/Cart/MyOrders.js'));
const OrderDetails = lazy(() => import('./component/Cart/OrderDetails.js'));
const PaymentElements = lazy(() => import('./component/Cart/PaymentElements'));
const Contact = lazy(() => import('./component/layout/Contact/Contact'));
const Dashboard = lazy(() => import('./component/Dashboard/Dashboard'));
const ProductList = lazy(() => import('./component/Dashboard/Products/ProductList'));


function App() {

  const { isAuthenticated, user } = useSelector(state => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await callApi.get('/stripe/api/key');

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser())
    getStripeApiKey()
  }, []);
  return (
    <Suspense fallback={<Loader />}>
      <Navbar />
      <br />
      {
        isAuthenticated &&
        <UserOptions user={user} />
      }
      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='/product/:id' element={<ProductDetails />} />

        <Route path='/products' element={<Products />} />

        <Route path='/products/:keyword' element={<Products />} />

        <Route path='/search' element={<Search />} />

        <Route path='/cart' element={<Cart />} />

        <Route element={<ProtectedRoute user={user} />}>
          <Route path='/account' element={<Profile />} />

          <Route path="/me/update" element={<UpdateProfile />} />

          <Route path="/password/update" element={<UpdatePassword />} />

          <Route path="/order/shipping" element={<Shipping />} />

          <Route path="/order/confirm" element={<ConfirmOrder />} />
          {
            stripeApiKey && <Route path="/order/payment" element={<PaymentElements stripeApiKey={stripeApiKey} />} />
          }
          <Route path="/order/success" element={<OrderSuccess />} />

          <Route path="/order/me" element={<MyOrders />} />

          <Route path="/order/:id" element={<OrderDetails />} />
          <Route element={<ProtectedRoute admin={true} />}>

            <Route path="/admin/dashboard" element={<Dashboard />} />

            <Route path="/admin/products" element={<ProductList />} />

          </Route>


        </Route>

        <Route path="/password/forgot" element={<ForgotPassword />} />

        <Route path="/password/reset/:token" element={<ResetPassword />} />

        <Route path='/contact' element={<Contact />} />

        <Route path='/login' element={<LoginSignup />} />

      </Routes>
      <Footer />
    </Suspense>
  );
}

export default App;
