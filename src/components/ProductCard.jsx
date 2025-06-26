import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  return (
    <motion.div
      whileHover={{ scale: 1.05, boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
      className="bg-white rounded-lg shadow p-4 flex flex-col items-center transition-all cursor-pointer"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded mb-4"
      />
      <h3 className="text-lg font-semibold mb-2 text-center">{product.name}</h3>
      <p className="text-blue-600 font-bold mb-2">${product.price}</p>
      <button className="mt-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
        View Details
      </button>
    </motion.div>
  );
};

export default ProductCard;
