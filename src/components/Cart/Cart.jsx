import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../Context/usercontext_temp';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function Cart() {
  let { getLoggedUserCart, UpdateCartProductQuantity, DeleteProduct, clearCart } = useContext(CartContext);
  const [CartDetails, setCartDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  async function getCartItems() {
    setLoading(true);
    let response = await getLoggedUserCart();
    if (response.data.status === "success") {
      setCartDetails(response.data.data);
    }
    setLoading(false);
  }

  async function UpdateProduct(id, count) {
    setLoading(true);
    if (count === 0) {
      await DeleteItem(id);
    } else {
      let response = await UpdateCartProductQuantity(id, count);
      if (response.data.status === "success") {
        setCartDetails(response.data.data);
        toast.success("Product updated successfully");
      } else {
        toast.error("Error updating product");
      }
    }
    setLoading(false);
  }

  async function handleClearCart() {
    setLoading(true);
    let response = await clearCart();
    if (response.data.message === "success") {
      setCartDetails(null);
      toast.success("Cart cleared successfully!");
    } else {
      toast.error("Failed to clear cart!");
    }
    setLoading(false);
  }

  async function DeleteItem(productId) {
    setLoading(true);
    let response = await DeleteProduct(productId);
    if (response.data.status === "success") {
      setCartDetails(response.data.data);
    }
    setLoading(false);
  }

  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-screen">
            <i className="fas fa-spinner fa-spin text-emerald-600 text-6xl mb-4"></i>
            <h2 className="text-2xl text-emerald-600 font-semibold font-mono">Loading your cart...</h2>
          </div>
        ) : CartDetails?.products.length > 0 ? (
          <>
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center mb-4">
                <i className="fas fa-shopping-cart text-blue-600 text-5xl mr-4"></i>
                <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-mono">
                  Shopping Cart
                </h2>
              </div>
              <div className="h-1 w-96 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full mb-6"></div>
              
              {/* Total Price Card */}
              <div className="inline-block bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-2xl shadow-xl">
                <p className="text-sm font-mono mb-1">Total Cart Price</p>
                <p className="text-4xl font-bold font-mono">
                  {CartDetails?.totalCartPrice} <span className="text-xl">EGP</span>
                </p>
              </div>
              
              {/* Items Count */}
              <p className="mt-4 text-gray-600 font-mono text-lg">
                You have <span className="font-bold text-blue-600">{CartDetails?.products.length}</span> items in your cart
              </p>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {CartDetails?.products.map((product) => (
                <div 
                  key={product.product.id} 
                  className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  {/* Product Image */}
                  <div className="relative overflow-hidden bg-gray-100">
                    <img 
                      src={product.product.imageCover} 
                      className="w-full h-56 object-contain group-hover:scale-110 transition-transform duration-300" 
                      alt={product.product.title} 
                    />
                    <div className="absolute top-3 right-3 bg-white rounded-full px-3 py-1 shadow-lg">
                      <i className="fas fa-box text-blue-500 mr-1"></i>
                      <span className="text-sm font-bold text-gray-700 font-mono">{product.count}x</span>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="p-5">
                    {/* Title */}
                    <h3 className="text-lg font-bold font-mono text-gray-800 mb-3 line-clamp-2 min-h-[3.5rem]">
                      {product.product.title}
                    </h3>

                    {/* Price per item */}
                    <div className="mb-4 pb-4 border-b-2 border-gray-100">
                      <p className="text-sm text-gray-500 font-mono mb-1">Price per item</p>
                      <p className="text-2xl font-bold text-emerald-600 font-mono">
                        {product.price} <span className="text-sm">EGP</span>
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 font-mono mb-2">Quantity</p>
                      <div className="flex items-center justify-between bg-gray-50 rounded-xl p-2">
                        <button 
                          onClick={() => UpdateProduct(product.product.id, product.count - 1)}
                          className="w-10 h-10 flex items-center justify-center bg-white text-gray-700 rounded-lg hover:bg-red-100 hover:text-red-600 transition-all shadow-md"
                        >
                          <i className="fas fa-minus"></i>
                        </button>
                        
                        <span className="text-2xl font-bold font-mono text-gray-800 px-4">
                          {product.count}
                        </span>
                        
                        <button 
                          onClick={() => UpdateProduct(product.product.id, product.count + 1)}
                          className="w-10 h-10 flex items-center justify-center bg-white text-gray-700 rounded-lg hover:bg-emerald-100 hover:text-emerald-600 transition-all shadow-md"
                        >
                          <i className="fas fa-plus"></i>
                        </button>
                      </div>
                    </div>

                    {/* Total Price */}
                    <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-3 mb-4">
                      <p className="text-sm text-gray-600 font-mono mb-1">Subtotal</p>
                      <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-mono">
                        {product.price * product.count} <span className="text-sm">EGP</span>
                      </p>
                    </div>

                    {/* Remove Button */}
                    <button 
                      onClick={() => DeleteItem(product.product.id)}
                      className="w-full bg-red-100 text-red-600 py-3 rounded-xl font-mono font-semibold hover:bg-red-200 transition-all duration-300 transform hover:scale-105"
                    >
                      <i className="fas fa-trash-alt mr-2"></i>
                      Remove from Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Action Buttons */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
                {/* Total Summary */}
                <div className="text-center lg:text-left">
                  <p className="text-sm text-gray-500 font-mono mb-1">Final Total</p>
                  <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 font-mono">
                    {CartDetails?.totalCartPrice} <span className="text-xl">EGP</span>
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                  <Link to={`/Checkout`} className="flex-1 lg:flex-initial">
                    <button className="w-full px-8 py-4 text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-mono text-lg font-semibold shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
                      <i className="fas fa-credit-card mr-2"></i>
                      Proceed to Checkout
                    </button>
                  </Link>
                  
                  <button 
                    onClick={handleClearCart} 
                    className="flex-1 lg:flex-initial px-8 py-4 text-white bg-gradient-to-r from-red-500 to-pink-500 rounded-xl font-mono text-lg font-semibold shadow-lg hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
                  >
                    <i className="fas fa-trash mr-2"></i>
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <div className="inline-block p-8 bg-white rounded-full shadow-xl mb-6">
              <i className="fas fa-shopping-cart text-gray-300 text-8xl"></i>
            </div>
            <h3 className="text-4xl text-gray-600 font-bold font-mono mb-4">
              Your Cart is Empty
            </h3>
            <p className="text-xl text-gray-500 font-mono mb-8">
              Looks like you haven't added anything yet!
            </p>
            <Link to="/products">
              <button className="inline-flex items-center bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-xl font-mono font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
                <i className="fas fa-shopping-bag mr-3 text-xl"></i>
                Start Shopping
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}