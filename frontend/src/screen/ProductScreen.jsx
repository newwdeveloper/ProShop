import { useParams, Link } from "react-router-dom";
//import products from "../products";
import Rating from "../components/Rating";
//import { useState, useEffect } from "react";
//import axios from "axios";
import { useGetProductDetailsQuery } from "../slices/productApiSlice";
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";

const ProductScreen = () => {
  //const [product, setProduct] = useState({});
  const { id: productId } = useParams();

  //const product = products.find((p) => p._id === productId);

  /*useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(
        `http://localhost:3000/api/products/${productId}`
      );
      setProduct(data);
    };
    fetchProduct();
  }, [productId]);

  if (!product || Object.keys(product).length === 0) {
    return (
      <h2 className="text-center text-red-600 text-2xl">Product Not Found</h2>
    );
  }*/

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);
  // const [showLoader, setShowLoader] = useState(true);

  /*useEffect(() => {
    if (!isLoading) {
      setTimeout(() => setShowLoader(false), 5000); // ⏳ Keep loader for 1 sec
    }
  }, [isLoading]);*/

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Back Button */}
      <Link
        to="/"
        className="text-blue-500 hover:underline text-lg mb-4 inline-block"
      >
        ← Back to Home
      </Link>

      {/* Product Details Container */}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message>{error?.data?.message || "Something went wrong!"}</Message>
      ) : (
        <div className="grid md:grid-cols-2 gap-8 bg-white p-6 rounded-lg shadow-md">
          {/* Product Image */}
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 object-cover rounded-md"
          />

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

            {/* Rating Component */}
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />

            <p className="text-xl font-bold text-green-600 mt-2">
              ${product.price}
            </p>

            <p className="text-gray-700 mt-4">{product.description}</p>

            {/* Stock Status */}
            <p
              className={`mt-2 font-semibold ${
                product.countInStock > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
            </p>

            {/* Add to Cart Button */}
            <button
              className={`mt-5 w-full py-2 rounded-md text-white transition ${
                product.countInStock > 0
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={product.countInStock === 0}
            >
              {product.countInStock > 0 ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductScreen;
