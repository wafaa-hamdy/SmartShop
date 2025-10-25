import React, { useContext } from "react";
import { useFormik } from "formik";
import { CartContext } from "../../Context/CartContext";

export default function Checkout() {
  let { cartId } = useContext(CartContext);
  let { Checkout } = useContext(CartContext);

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    
onSubmit: () => handelCheckout(cartId, `${window.location.origin}`)
  });

 async function handelCheckout(cartId) {
  const successUrl = `${window.location.origin}/allorders?success=true`;
  const cancelUrl = `${window.location.origin}/cancel`;

  let { data } = await Checkout(cartId, successUrl, formik.values);

  window.location.href = data.session.url;
  console.log(data.session.url);
}


return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-12 px-4 sm:px-6 lg:px-8">
      <form
        onSubmit={formik.handleSubmit}
        className="max-w-xl w-full bg-white p-8 sm:p-10 shadow-2xl rounded-2xl border border-gray-100"
      >
        <div className="text-center mb-8">
          <h2 className="font-serif text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 mb-2">
            Checkout Now
          </h2>
          <p className="text-gray-500 text-sm">Complete your purchase details</p>
        </div>

        <div className="space-y-6">
          <div className="relative">
            <input
              type="text"
              name="details"
              id="details"
              value={formik.values.details}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block w-full px-4 py-3 text-gray-900 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all peer placeholder-transparent"
              placeholder="Details"
              required
            />
            <label
              htmlFor="details"
              className="absolute left-4 -top-2.5 bg-white px-1 text-sm font-medium text-emerald-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-emerald-600 peer-focus:text-sm"
            >
              Enter your details
            </label>
          </div>

          <div className="relative">
            <input
              type="tel"
              name="phone"
              id="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block w-full px-4 py-3 text-gray-900 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all peer placeholder-transparent"
              placeholder="Phone"
              required
            />
            <label
              htmlFor="phone"
              className="absolute left-4 -top-2.5 bg-white px-1 text-sm font-medium text-emerald-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-emerald-600 peer-focus:text-sm"
            >
              Enter your phone
            </label>
          </div>

          <div className="relative">
            <input
              type="text"
              name="city"
              id="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block w-full px-4 py-3 text-gray-900 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all peer placeholder-transparent"
              placeholder="City"
              required
            />
            <label
              htmlFor="city"
              className="absolute left-4 -top-2.5 bg-white px-1 text-sm font-medium text-emerald-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-emerald-600 peer-focus:text-sm"
            >
              Enter your city
            </label>
          </div>
        </div>

        <div className="mt-8">
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold text-lg py-3.5 px-6 rounded-lg hover:from-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-4 focus:ring-emerald-300 transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
          >
            Checkout
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            <i className="fas fa-lock text-emerald-700 mr-2 text-xl"></i>
    Your information is secure and encrypted
          </p>
        </div>
      </form>
    </div>
  );
}