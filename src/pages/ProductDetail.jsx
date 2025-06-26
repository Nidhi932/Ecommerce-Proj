import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import productsData from "../api/products.json";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = productsData.find((p) => p.id === Number(id));

  if (!product)
    return <div className="text-center py-20">Product not found.</div>;

  const handleAddToCart = () => {
    addToCart(product);
    toast.success("Added to cart!");
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
      <motion.img
        src={product.image}
        alt={product.name}
        className="w-full md:w-1/2 h-96 object-cover rounded shadow"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
      />
      <div className="flex-1 flex flex-col justify-center">
        <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
        <p className="text-lg text-gray-600 mb-2">
          Category: {product.category}
        </p>
        <p className="text-2xl text-blue-600 font-bold mb-4">
          ${product.price}
        </p>
        <p className="mb-6">{product.description}</p>
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition mb-4"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
        <button
          className="text-blue-600 underline"
          onClick={() => navigate(-1)}
        >
          Back to Products
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
