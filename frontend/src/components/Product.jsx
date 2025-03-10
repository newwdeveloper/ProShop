import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = ({ product }) => {
  const truncateName =
    product.name.length > 15 ? product.name.slice(0, 15) + "..." : product.name;

  return (
    <div className="w-92 rounded-lg p-4 shadow-md bg-white hover:scale-110 transition-transform duration-300">
      <Link to={`/product/${product._id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-56 object-cover rounded-md"
        />
      </Link>
      <div className="mt-3 text-center">
        <Link
          to={`/product/${product._id}`}
          className="text-lg font-semibold hover:underline"
        >
          {truncateName}
        </Link>

        {/* Centered Rating with Padding */}
        <div className="flex justify-center mt-2">
          <Rating
            value={product.rating}
            text={`${product.numReviews} Reviews`}
          />
        </div>

        <p className="text-xl font-bold text-green-600 mt-2">
          ${product.price}
        </p>
      </div>
    </div>
  );
};

export default Product;
