import Product from "../components/Product";

import { useState, useEffect } from "react";
import axios from "axios";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get("http://localhost:3000/api/products");
      console.log("api response", data);
      setProducts(data);
    };

    fetchProduct(); // Call the function inside useEffect
  }, []);
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Product List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {products?.map((product) => (
          <div key={product._id} className="flex justify-center">
            <Product product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;
