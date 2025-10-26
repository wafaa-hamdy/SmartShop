import { useContext, useEffect, useState } from "react";
import { WishlistContext } from "../../Context/WishlistContext";
import { CartContext } from "../../Context/CartContext";
import toast, { Toaster } from "react-hot-toast";

function WishlistPage() {
    const { wishlist, getWishlist, removeFromWishlist } = useContext(WishlistContext);
    const { addProductToCart } = useContext(CartContext);
    
    const [loadingAdd, setLoadingAdd] = useState({});
    const [loadingRemove, setLoadingRemove] = useState({});

    useEffect(() => {
        getWishlist();
    }, []);

    const handleAddToCart = async (productId) => {
        setLoadingAdd((prev) => ({ ...prev, [productId]: true })); 
        
        await addProductToCart(productId); 

        setLoadingAdd((prev) => ({ ...prev, [productId]: false })); 
        toast.success("Product added to cart successfully!", { position: "top-center", duration: 2000 });
    };

    const handleRemoveFromWishlist = async (productId) => {
        setLoadingRemove((prev) => ({ ...prev, [productId]: true })); 

        await removeFromWishlist(productId); 

        setLoadingRemove((prev) => ({ ...prev, [productId]: false })); 
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 py-12 px-4">
            <div className="container mx-auto max-w-7xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center mb-4">
                          <i className="fas fa-heart text-red-500 text-4xl "></i>

                        <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600 font-mono ml-2">
                            My Wishlist:
                        </h2>
                    </div>
                    <div className="h-1 w-80 bg-gradient-to-r from-rose-400 to-pink-400 mx-auto rounded-full"></div>
                    {wishlist.length > 0 && (
                        <p className="mt-4 text-gray-600 font-mono text-lg">
                            You have <span className="font-bold text-rose-600">{wishlist.length}</span> items in your wishlist
                        </p>
                    )}
                </div>

                <Toaster />

                {wishlist.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {wishlist.map((product) => (
                            <div 
                                key={product.id} 
                                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                            >
                                {/* Product Image with Heart Badge */}
                                <div className="relative overflow-hidden bg-gray-100">
                                    <img 
                                        src={product.imageCover} 
                                        alt={product.title} 
                                        className="w-full h-64 object-contain group-hover:scale-105 transition-transform duration-300" 
                                    />
                                    <div className="absolute top-2 right-4 bg-white rounded-full p-2 shadow-lg">
                                        <i className="fas fa-heart text-red-400 text-xl"></i>
                                    </div>
                                </div>

                                {/* Product Details */}
                                <div className="p-6">
                                    {/* Category Badge */}
                                    <div className="mb-3">
                                        <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full font-mono">
                                            {product.category.name}
                                        </span>
                                    </div>

                                    {/* Product Title */}
                                    <h3 className="font-mono text-xl font-bold text-gray-800 mb-3 line-clamp-2 min-h-[3.5rem]">
                                        {product.title}
                                    </h3>

                                    {/* Price */}
                                    <div className="mb-5">
                                        <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 font-mono">
                                            {product.price} <span className="text-lg">EGP</span>
                                        </p>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => handleAddToCart(product.id)}
                                            disabled={loadingAdd[product.id]} 
                                            className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-xl font-mono font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                                        >
                                            {loadingAdd[product.id] ? (
                                                <span className="flex items-center justify-center">
                                                   <i className="animate-spin fas fa-spinner text-emerald-800 text-xl"></i>

                                                    Adding...
                                                </span>
                                            ) : (
                                                <span className="flex items-center justify-center">
                                                   <i className="fas fa-shopping-cart text-emerald-800 text-xl mr-2 "></i>

                                                    Add to Cart
                                                </span>
                                            )}
                                        </button>
                                        
                                        <button
                                            onClick={() => handleRemoveFromWishlist(product.id)}
                                            disabled={loadingRemove[product.id]} 
                                            className="bg-red-100 text-red-600 p-3 rounded-xl hover:bg-red-200 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed group"
                                            title="Remove from wishlist"
                                        >
                                            {loadingRemove[product.id] ? (
                                               <i className="animate-spin fas fa-spinner text-green-500 text-xl"></i>

                                            ) : (
                                           <i className="fas fa-trash text-red-400 text-xl"></i>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="inline-block p-8 bg-white rounded-full shadow-xl mb-6">
                         <i className="fas fa-heart text-gray-300 text-8xl"></i>

                        </div>
                        <h3 className="text-4xl text-gray-600 font-bold font-mono mb-4">
                            Your Wishlist is Empty
                        </h3>
                        <p className="text-xl text-gray-500 font-mono mb-8">
                            Start adding items you love!
                        </p>
                        <button 
                            onClick={() => window.location.href = '/products'}
                            className="inline-flex items-center bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 py-4 rounded-xl font-mono font-semibold hover:from-rose-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                           <i className="fas fa-shopping-bag text-white mr-2 text-xl"></i>

                            Start Shopping
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default WishlistPage;