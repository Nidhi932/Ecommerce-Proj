import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import productsData from "../api/products.json";
import Pagination from "../components/Pagination";

const categories = [
  "All",
  ...Array.from(new Set(productsData.map((p) => p.category))),
];
const PRODUCTS_PER_PAGE = 8;

const Home = () => {
  const [products, setProducts] = useState(productsData);
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let filtered = productsData;
    if (category !== "All") {
      filtered = filtered.filter((p) => p.category === category);
    }
    if (sort === "low-high") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sort === "high-low") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }
    setProducts(filtered);
    setCurrentPage(1); // Reset to first page on filter/sort change
  }, [category, sort]);

  // Pagination logic
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = products.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded border ${
                category === cat
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700"
              }`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <div>
          <select
            className="border rounded px-3 py-2"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paginatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Home;
