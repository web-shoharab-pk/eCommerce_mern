import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './component/layout/Footer/Footer'; 
import Header from './component/layout/Header/header';
import WebFont from "webfontloader";
import { lazy, Suspense, useEffect } from 'react';
import Loader from './component/Loader/Loader';
import LoginSignup from './component/User/LoginSignup';
const Home =lazy(() => import('./component/Home/Home.js'));
const ProductDetails = lazy(() => import('./component/Product/ProductDetail.js'))
const Products = lazy(() => import('./component/Product/Products.js'));
const Search = lazy(() => import('./component/Product/Search.js'));



function App() {

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);
  return (
    <Suspense fallback={<Loader />}>
      <Header /> 
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/:keyword' element={<Products />} />
        <Route path='/search' element={<Search />} />
        <Route path='/login' element={<LoginSignup />} />
      </Routes>
      <Footer />
    </Suspense>
  );
}

export default App;
