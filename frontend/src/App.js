import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './component/layout/Footer/Footer'; 
import Header from './component/layout/Header/header';
import UserOptions from './component/layout/Header//UserOptions.js';
import WebFont from "webfontloader";
import { lazy, Suspense, useEffect } from 'react';
import Loader from './component/Loader/Loader';
import LoginSignup from './component/User/LoginSignup';
import store from './store';
import { loadUser } from './actions/userAction';
import { useSelector } from 'react-redux';
import ProtectedRoute from './component/Route/ProtectedRoute'; 
const Home =lazy(() => import('./component/Home/Home'));
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
const ConfirmOrder = lazy(() => import('./component/Cart/ConfirmOrder'))

function App() {

  const {isAuthenticated, user} = useSelector(state => state.user)

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser())
  }, []);
  return (
    <Suspense fallback={<Loader />}>
      <Header />
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
        </Route>
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path='/login' element={<LoginSignup />} />
      </Routes>
      <Footer />
    </Suspense>
  );
}

export default App;
