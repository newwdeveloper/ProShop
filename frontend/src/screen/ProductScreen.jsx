import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import Rating from "../components/Rating";
import { useGetProductDetailsQuery } from "../slices/productApiSlice";
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";
import { addToCart } from "../slices/cartSlice.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const ProductScreen = () => {
  const { id: productId } = useParams();
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);
  function handleAddToCart() {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  }
  return (
    <div className="max-w-4xl mx-auto p-4">
      <Link
        to="/"
        className="text-blue-500 hover:underline text-lg mb-4 inline-block"
      >
        ← Back to Home
      </Link>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message>{error?.data?.message || "Something went wrong!"}</Message>
      ) : (
        <div className="grid md:grid-cols-2 gap-8 bg-white p-6 rounded-lg shadow-md">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 object-cover rounded-md"
          />

          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
            <p className="text-xl font-bold text-green-600 mt-2">
              ${product.price}
            </p>
            <p className="text-gray-700 mt-4">{product.description}</p>

            <p
              className={`mt-2 font-semibold ${
                product.countInStock > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
            </p>

            {/* Quantity Selector */}
            {product.countInStock > 0 && (
              <div className="mt-4">
                <label className="font-semibold mr-2">Qty:</label>
                <select
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                  className="w-3/12 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400 transition"
                >
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button
              className={`mt-5 w-full py-2 rounded-md text-white transition cursor-pointer ${
                product.countInStock > 0
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={product.countInStock === 0}
              onClick={handleAddToCart}
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
