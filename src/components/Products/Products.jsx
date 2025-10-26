import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import useProducts from "../../Hooks/useProducts";
import { CartContext } from "../../Context/usercontext_temp";
import toast from "react-hot-toast";
import { WishlistContext } from "../../Context/WishlistContext";
import { Heart } from "lucide-react";

export default function Products() {
  let { data, isError, isLoading, error } = useProducts();
  let { addProductToCart } = useContext(CartContext);
  const { addToWishlist, removeFromWishlist, wishlist } = useContext(WishlistContext);

  const [loading, setLoading] = useState(false);
  const [currentId, setCurrentId] = useState(0);

  async function addToCart(id) {
    setCurrentId(id);
    setLoading(true);
    
    let response = await addProductToCart(id);
    if (response.data.status === "success") {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
    
    setLoading(false);
  }

  async function handleWishlist(id) {
    const isInWishlist = wishlist.some((item) => item._id === id);
    if (isInWishlist) {
      await removeFromWishlist(id);
    } else {
      await addToWishlist(id);
    }
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex justify-center items-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-red-200">
          <div className="text-center text-red-600">
            <div className="text-6xl mb-4">⚠️</div>
            <p className="text-lg font-semibold">Error: {error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex justify-center items-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-emerald-500"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="h-12 w-12 bg-emerald-100 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-12 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 mb-3">
            Our Products
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {data?.data?.data?.map((product) => {
            const isInWishlist = wishlist.some((item) => item._id === product._id);

            return (
              <div 
                key={product.id} 
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:scale-105"
              >
                <div className="relative">
                  <Link to={`/ProductDetails/${product.id}/${product.category?.name || "unknown"}`}>
                    <div className="relative overflow-hidden bg-gray-50">
                      <img
                        src={product.imageCover || "fallback-image.jpg"}
                        className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                        alt={product.title || "No Title"}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      <span className="absolute top-3 left-3 px-3 py-1 bg-emerald-500 text-white text-xs font-semibold rounded-full shadow-lg">
                        {product.category?.name || "No Category"}
                      </span>
                    </div>

                    <div className="p-4">
                      <h3 className="text-lg font-bold text-gray-800 mb-3 truncate group-hover:text-emerald-600 transition-colors">
                        {product.title?.split(" ").slice(0, 2).join(" ") || "No Title"}
                      </h3>
                      
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-xl font-bold text-emerald-600">
                          {product.price || "N/A"} <span className="text-sm">EGP</span>
                        </span>
                        <span className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                          <i className="fas fa-star text-yellow-400 text-sm"></i>
                          <span className="text-sm font-semibold text-gray-700">{product.ratingsAverage || "N/A"}</span>
                        </span>
                      </div>
                    </div>
                  </Link>

                  <button
                    onClick={() => handleWishlist(product._id)}
                    className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110"
                  >
                    <Heart 
                      className={`h-5 w-5 transition-all ${
                        isInWishlist 
                          ? "text-red-500 fill-red-500" 
                          : "text-gray-400 hover:text-red-500"
                      }`} 
                    />
                  </button>
                </div>

                <div className="px-4 pb-4">
                  <button 
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                    onClick={() => addToCart(product.id)}
                    disabled={loading && currentId === product.id}
                  >
                    {loading && currentId === product.id ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                        Adding...
                      </span>
                    ) : (
                      "Add To Cart"
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}