import React from "react";
import { useCart } from "../context/CartContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

const Checkout = () => {
  const { cart, total, clearCart } = useCart();

  const formik = useFormik({
    initialValues: { name: "", email: "", address: "" },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      address: Yup.string().required("Required"),
    }),
    onSubmit: (values, { resetForm }) => {
      toast.success("Order placed successfully!");
      clearCart();
      resetForm();
    },
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>
      <form
        className="bg-white p-6 rounded shadow space-y-4"
        onSubmit={formik.handleSubmit}
      >
        <input
          className="w-full border rounded px-3 py-2"
          placeholder="Name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.name && formik.errors.name && (
          <div className="text-red-500 text-sm">{formik.errors.name}</div>
        )}
        <input
          className="w-full border rounded px-3 py-2"
          placeholder="Email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email && (
          <div className="text-red-500 text-sm">{formik.errors.email}</div>
        )}
        <input
          className="w-full border rounded px-3 py-2"
          placeholder="Address"
          name="address"
          value={formik.values.address}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.address && formik.errors.address && (
          <div className="text-red-500 text-sm">{formik.errors.address}</div>
        )}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Place Order
        </button>
      </form>
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
        {cart.length === 0 ? (
          <div className="text-gray-500">No items in cart.</div>
        ) : (
          <ul className="mb-2">
            {cart.map((item) => (
              <li key={item.id}>
                {item.name} x {item.quantity}
              </li>
            ))}
          </ul>
        )}
        <div className="font-bold">Total: ${total.toFixed(2)}</div>
      </div>
    </div>
  );
};

export default Checkout;
