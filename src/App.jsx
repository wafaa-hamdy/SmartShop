import React from 'react';
import './App.css';
import{createBrowserRouter, createHashRouter, RouterProvider} from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Products from './components/Products/Products';
import Cart from './components/Cart/Cart';
import Brands from './components/Brands/Brands';
import Categories from './components/Categories/Categories';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Notfound from './components/Notfound/Notfound';
import CounterContextProvider from './Context/CounterContext';
import UserContextProvider from './Context/UserContext';
import ProtectedRoute from './components/protectedRoute/protectedRoute';
import ProductDetails from "./components/ProductDetails/ProductDetails";
import {QueryClient,QueryClientProvider} from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import WishList from './components/WishList/WishList';
import CartContextProvider from './Context/usercontext_temp';
import { Toaster } from 'react-hot-toast';
import Checkout from './components/Checkout/Checkout';
import Allorders from "./components/AllOrders/Allorders";
import { WishlistProvider } from './Context/WishlistContext';
import { BrandsProvider } from './Context/BrandsContext';
import { CategoriesProvider } from './Context/CategoriesContext';
import { AllOrdersProvider } from './Context/AllordersContext';

let query = new QueryClient()


let x = createBrowserRouter([
    {path:"", element: <Layout/>,
       children: [
    {index: true, element: <ProtectedRoute> <Home/> </ProtectedRoute> },
    { path: "Products", element: <ProtectedRoute> <Products/> </ProtectedRoute> },
    { path: "cart", element:<ProtectedRoute> <Cart/></ProtectedRoute>  },
    { path: "Brands", element: <ProtectedRoute> <Brands/> </ProtectedRoute>},
    { path:"ProductDetails/:id/:category", element: <ProtectedRoute> <ProductDetails /> </ProtectedRoute>},
    { path: "Categories", element: <ProtectedRoute> <Categories/></ProtectedRoute> },
    { path: "Register", element: <Register/> },
    { path: "Login", element: <Login /> },
    { path: "*", element:  <Notfound/>  },
    { path: "WishList", element: <ProtectedRoute> <WishList/></ProtectedRoute> },
    { path: "Checkout", element: <ProtectedRoute> <Checkout/></ProtectedRoute> },
    { path: "Allorders", element: <ProtectedRoute> <Allorders/></ProtectedRoute> },
    

    
  ]} ,
])
function App() {




  return (
    <>
  <UserContextProvider>
    <CounterContextProvider>
      <QueryClientProvider client={query}>
        <AllOrdersProvider>
        <WishlistProvider>
        <CartContextProvider>
          <BrandsProvider>
          <CategoriesProvider>
        <RouterProvider router={x}></RouterProvider>
            <Toaster/>
            </CategoriesProvider>
            </BrandsProvider>
        </CartContextProvider>
        </WishlistProvider>
        </AllOrdersProvider>
            <ReactQueryDevtools/>
      </QueryClientProvider>
    </CounterContextProvider>
   </UserContextProvider>
    </>
  )
}

export default App