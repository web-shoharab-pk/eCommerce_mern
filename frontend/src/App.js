import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './component/layout/Footer/Footer'; 

import WebFont from "webfontloader";
import { lazy, Suspense, useEffect } from 'react';
const Home =lazy(() => import('./component/Home/Home.js'));

function App() {

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);
  return (
    <Suspense fallback={<h3>Loading ...</h3>}>
      {/* <Header />  */}
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
      <Footer />
    </Suspense>
  );
}

export default App;
