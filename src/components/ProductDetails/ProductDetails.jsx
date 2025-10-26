import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import { WishlistContext } from "../../Context/WishlistContext"; 
import { Heart } from "lucide-react";
import { CartContext } from "../../Context/usercontext_temp";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const [Product, setProduct] = useState(null);
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [loadingProductId, setLoadingProductId] = useState(null);
  const { id, category } = useParams();

  const { addToWishlist, removeFromWishlist, wishlist } = useContext(WishlistContext);
  let { addProductToCart } = useContext(CartContext);

  async function addToCart(productId) {
    setLoadingProductId(productId);
    let response = await addProductToCart(productId);
    if (response.data.status === "success") {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
    setLoadingProductId(null);
  }

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  function getProduct(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((res) => {
        setProduct(res.data.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }

  function getAllProduct() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((res) => {
        let related = res.data.data.filter((p) => p.category.name === category);
        setRelatedProduct(related);
      })
      .catch((res) => {
        console.log(res);
      });
  }

  useEffect(() => {
    getProduct(id);
    getAllProduct();
  }, [id, category]);

  function handleWishlist(productId) {
    const isInWishlist = wishlist.some((item) => item._id === productId);
    if (isInWishlist) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(productId);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-8 px-4">
      <div className="container mx-auto">
        {/* Product Details Section */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-12">
          <div className="flex flex-wrap items-center gap-8">
            <div className="w-full md:w-1/2 lg:w-5/12">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 shadow-inner">
                <Slider {...settings}>
                  {Product?.images.map((src, index) => (
                    <div key={index} className="px-4">
                      <img src={src} className="w-full max-w-md mx-auto rounded-xl" alt="Product" />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>

            <div className="w-full md:w-1/2 lg:w-6/12 space-y-4">
              <div>
                <span className="inline-block px-4 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold mb-3">
                  {Product?.category.name}
                </span>
                <h3 className="text-3xl font-bold text-gray-800 mb-3">
                  {Product?.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{Product?.description}</p>
              </div>

              <div className="flex items-center justify-between py-4 border-t border-b border-gray-200">
                <div>
                  <span className="text-3xl font-bold text-emerald-600">
                    {Product?.price} <span className="text-lg">EGP</span>
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-2 bg-yellow-50 px-3 py-2 rounded-lg">
                    <i className="fas fa-star text-yellow-400"></i>
                    <span className="font-semibold text-gray-700">{Product?.ratingsAverage}</span>
                  </span>
                  <button 
                    onClick={() => handleWishlist(Product?._id)}
                    className="p-2 rounded-full hover:bg-red-50 transition-colors"
                  >
                    <Heart
                      className={`h-7 w-7 transition-all ${
                        wishlist.some((item) => item._id === Product?._id)
                          ? "text-red-500 fill-red-500 scale-110"
                          : "text-gray-400 hover:text-red-500"
                      }`}
                    />
                  </button>
                </div>
              </div>

              <button 
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold text-lg py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                onClick={() => addToCart(Product?._id)}
                disabled={loadingProductId === Product?._id}
              >
                {loadingProductId === Product?._id ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                    Adding...
                  </span>
                ) : (
                  "Add To Cart"
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div>
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
              Related Products
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full mt-2"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {relatedProduct.length > 0 ? (
              relatedProduct.map((product) => (
                <div key={product.id} className="group">
                  <div className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:scale-105">
                    <Link to={`/ProductDetails/${product.id}/${product.category.name}`}>
                      <div className="relative overflow-hidden bg-gray-50 p-4">
                        <img 
                          src={product.imageCover} 
                          className="w-full h-48 object-contain transition-transform duration-500 group-hover:scale-110" 
                          alt={product.title} 
                        />
                        <span className="absolute top-2 left-2 px-3 py-1 bg-emerald-500 text-white text-xs font-semibold rounded-full">
                          {product.category.name}
                        </span>
                      </div>
                      
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-800 mb-2 truncate group-hover:text-emerald-600 transition-colors">
                          {product.title}
                        </h3>
                        
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-lg font-bold text-emerald-600">
                            {product.price} <span className="text-sm">EGP</span>
                          </span>
                          <span className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                            <i className="fas fa-star text-yellow-400 text-xs"></i>
                            <span className="text-sm font-semibold text-gray-700">{product.ratingsAverage}</span>
                          </span>
                        </div>
                      </div>
                    </Link>

                    <div className="px-4 pb-4 flex gap-2">
                      <button 
                        className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-2 rounded-lg transition-all duration-300 text-sm disabled:opacity-70 disabled:cursor-not-allowed"
                        onClick={() => addToCart(product._id)}
                        disabled={loadingProductId === product._id}
                      >
                        {loadingProductId === product._id ? (
                          <span className="flex items-center justify-center gap-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                            <span className="text-xs">Adding...</span>
                          </span>
                        ) : (
                          "Add To Cart"
                        )}
                      </button>
                      <button 
                        onClick={() => handleWishlist(product._id)}
                        className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        <Heart
                          className={`h-5 w-5 ${
                            wishlist.some((item) => item._id === product._id)
                              ? "text-red-500 fill-red-500"
                              : "text-gray-400 hover:text-red-500"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full flex justify-center py-12">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-emerald-500"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}