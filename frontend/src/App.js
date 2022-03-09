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
const Home =lazy(() => import('./component/Home/Home.js'));
const ProductDetails = lazy(() => import('./component/Product/ProductDetail.js'))
const Products = lazy(() => import('./component/Product/Products.js'));
const Search = lazy(() => import('./component/Product/Search.js'));
const Profile = lazy(() => import('./component/User/Profile.js'))
const UpdateProfile = lazy(() => import('./component/User/UpdateProfile.js'))


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
        <Route path='/login' element={<LoginSignup />} />
        <Route element={<ProtectedRoute user={user} />}>
        <Route path='/account' element={<Profile />} />
          <Route path="/me/update" element={<UpdateProfile />} />
        </Route>
      </Routes>
      <Footer />
    </Suspense>
  );
}

export default App;
