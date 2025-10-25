import axios from 'axios';
import { createContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export const WishlistContext = createContext();

export function WishlistProvider({ children }) {
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('UserToken');
        if (token) {
            getWishlist(); // هننفذه بس لو في توكن
        } else {
            setWishlist([]); // reset لو مفيش توكن
        }
    }, []); 

    async function addToWishlist(productId) {
        try {
            setLoading(true);
            let { data } = await axios.post(
                `https://ecommerce.routemisr.com/api/v1/wishlist`,
                { productId },
                {
                    headers: { token: localStorage.getItem('UserToken') } 
                }
            );

            if (data.status === "success") {
                toast.success(data.message);
                await getWishlist(); 
                return data;
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error adding to wishlist");
        } finally {
            setLoading(false);
        }
    }

    async function removeFromWishlist(productId) {
        try {
            setLoading(true);
            let { data } = await axios.delete(
                `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
                {
                    headers: { token: localStorage.getItem('UserToken') } 
                }
            );

            if (data.status === "success") {
                toast.success(data.message);
                await getWishlist(); 
                return data;
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error removing from wishlist");
        } finally {
            setLoading(false);
        }
    }

    async function getWishlist() {
        try {
            let token = localStorage.getItem('UserToken'); 
            if (!token) {
                // بدل ما يطلع error console
                console.warn("No user token found in localStorage, skipping wishlist fetch");
                setWishlist([]); // نتأكد ان الـ state فاضي
                return;
            }

            let { data } = await axios.get(
                `https://ecommerce.routemisr.com/api/v1/wishlist`,
                {
                    headers: { token: token } 
                }
            );

            setWishlist(data.data || []);
            return data;
        } catch (error) {
            console.error("Error fetching wishlist:", error);
            return error;
        }
    }

    return (
        <WishlistContext.Provider value={{
            wishlist,
            loading,
            addToWishlist,
            removeFromWishlist,
            getWishlist
        }}>
            {children}
        </WishlistContext.Provider>
    );
}
