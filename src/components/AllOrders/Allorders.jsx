import React from "react";
import { useAllOrders } from "../../Context/AllordersContext";

export default function AllOrders() {
  const { allOrders, userOrders, loading } = useAllOrders();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-emerald-600 mb-4"></div>
          <h2 className="text-3xl font-mono text-emerald-700">
            Loading Orders...
          </h2>
        </div>
      </div>
    );
  }

  const ordersArray = userOrders.length > 0 ? userOrders : allOrders?.data || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-12 px-4 font-mono">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 mb-4">
            {userOrders.length > 0 ? "Your Orders:" : "All Orders"}
          </h2>
          <div className="h-1 w-80 bg-gradient-to-r from-emerald-400 to-teal-400 mx-auto rounded-full"></div>
        </div>

        {ordersArray.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-block p-8 bg-white rounded-full shadow-lg mb-6">
              <svg className="w-24 h-24 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-4xl text-gray-600 font-semibold">
              No orders found
            </h3>
            <p className="text-xl text-gray-500 mt-4">Start shopping to see your orders here!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ordersArray.map((order) => (
              <div 
                key={order._id} 
                className="group bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* Order Header with Gradient */}
                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                   
                   
                  </div>
                  
                  {/* Price Badge */}
                  <div className="flex items-center justify-center">
                    <div className="bg-white rounded-xl px-6 py-3 shadow-lg">
                      <p className="text-sm text-gray-500 mb-1">Total Amount</p>
                      <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
                        ${order.totalOrderPrice}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Order Body */}
                <div className="p-6">
                  {/* Order ID */}
                  <div className="mb-4 pb-4 border-b-2 border-gray-100">
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Order ID</p>
                    <p className="text-sm text-gray-700 font-mono break-all">{order._id}</p>
                  </div>

                  {/* Payment Method */}
                  <div className="mb-6 flex items-center space-x-3">
                    <div className="bg-emerald-100 rounded-lg p-2">
                      <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Payment Method</p>
                      <p className="text-sm font-semibold text-gray-700 capitalize">{order.paymentMethodType}</p>
                    </div>
                  </div>

                  {/* Products */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-bold text-gray-800">Products</h4>
                      <span className="bg-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full">
                        {order.cartItems.length} items
                      </span>
                    </div>
                    
                    <ul className="space-y-3 max-h-64 overflow-y-auto">
                      {order.cartItems.map(({ product, count, price }) => (
                        <li
                          key={product._id}
                          className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex-shrink-0">
                            <img
                              src={product.imageCover}
                              alt={product.title}
                              className="w-16 h-16 rounded-lg object-cover shadow-md ring-2 ring-white transition-all duration-300 transform hover:scale-105"
                            />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h5 className="text-sm font-semibold text-gray-800 truncate mb-1">
                              {product.title}
                            </h5>
                            <p className="text-xs text-gray-500 truncate mb-2">
                              ID: {product._id.slice(-8)}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-600 bg-white px-2 py-1 rounded-md">
                                Qty: {count}
                              </span>
                              <span className="text-sm font-bold text-orange-500">
                                ${price}
                              </span>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                 
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}