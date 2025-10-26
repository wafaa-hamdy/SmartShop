import axios from "axios";
import { useState, useEffect, createContext } from "react";

export let CartContext = createContext();

export default function CartContextProvider(props) {
  const [cartId, setcartId] = useState(0);
  const [numberCart, setnumberCart] = useState(0);

  function addProductToCart(productId) {
    let headers = { token: localStorage.getItem("UserToken") };
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId },
        { headers }
      )
      .then((res) => {
        getLoggedUserCart();
        return res;
      })
      .catch((err) => err);
  }

  function getLoggedUserCart() {
    let headers = { token: localStorage.getItem("UserToken") };
    const token = headers.token;
    if (!token) {
      console.warn("No user token found in localStorage, skipping cart fetch");
      setcartId(0);
      setnumberCart(0);
      return;
    }
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
      .then((res) => {
        setnumberCart(res.data.numOfCartItems);
        setcartId(res.data.data._id);
        return res;
      })
      .catch((err) => err);
  }

  function UpdateCartProductQuantity(productId, newCount) {
    let headers = { token: localStorage.getItem("UserToken") };
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count: newCount },
        { headers }
      )
      .then((res) => res)
      .catch((err) => err);
  }

  function DeleteProduct(productId) {
    let headers = { token: localStorage.getItem("UserToken") };
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  function Checkout(cartId, successUrl, formData) {
    let headers = { token: localStorage.getItem("UserToken") };
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${successUrl}`,
        { shippingAddress: formData },
        { headers }
      )
      .then((res) => res)
      .catch((err) => err);
  }

  function clearCart() {
    let headers = { token: localStorage.getItem("UserToken") };
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
      .then((res) => res)
      .catch((err) => err);
  }

  useEffect(() => {
    if (localStorage.getItem("UserToken")) {
      getLoggedUserCart();
    } else {
      setcartId(0);
      setnumberCart(0);
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        DeleteProduct,
        addProductToCart,
        getLoggedUserCart,
        UpdateCartProductQuantity,
        clearCart,
        Checkout,
        cartId,
        numberCart,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
