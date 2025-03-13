import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../slices/cartSlice"; // Import remove action

const CartScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, itemsPrice, shippingPrice, taxPrice, totalPrice } =
    useSelector((state) => state.cart);

  const updateQty = async (item, qty) => {
    dispatch(addToCart({ ...item, qty: Number(qty) }));
  };

  const handleRemoveFromCart = async (id) => {
    dispatch(removeFromCart(id)); // Calls Redux remove action
  };

  return (
    <div className="container mx-auto p-4 flex flex-col lg:flex-row gap-6">
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-4">
          {cartItems.length > 0 ? "Shopping Cart" : ""}
        </h2>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center p-10">
            <span className="text-6xl">🛒</span>
            <h2 className="text-xl font-semibold text-gray-700 mt-4">
              Your cart is empty!
            </h2>
            <p className="text-gray-500 mb-4">
              Looks like you haven’t added anything yet.
            </p>
            <Link
              to="/"
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center p-4 rounded-lg shadow-md bg-white"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md border"
                />

                <div className="ml-4 flex-1">
                  <Link
                    to={`/product/${item._id}`}
                    className="font-semibold text-blue-600"
                  >
                    {item.name}
                  </Link>
                  <p className="text-gray-600">${item.price}</p>
                </div>

                <select
                  value={item.qty}
                  onChange={(e) => updateQty(item, e.target.value)}
                  className="border px-2 py-1 rounded"
                >
                  {[...Array(item.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => handleRemoveFromCart(item._id)}
                  className="text-red-500 ml-4 hover:text-red-700 cursor-pointer"
                >
                  <FaTrash size={20} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Order Summary */}
      {cartItems.length > 0 && (
        <div className="lg:w-1/3 bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center border-b pb-3">
            Order Summary
          </h2>

          <div className="space-y-3 text-gray-700">
            <div className="flex justify-between text-lg">
              <span className="font-medium">Unique Items:</span>
              <span className="font-semibold">{cartItems.length}</span>
            </div>

            <div className="flex justify-between text-lg">
              <span className="font-medium">Total Quantity:</span>
              <span className="font-semibold">
                {cartItems.reduce((acc, item) => acc + item.qty, 0)}
              </span>
            </div>

            <div className="flex justify-between text-lg">
              <span className="font-medium">Subtotal:</span>
              <span className="font-semibold">${itemsPrice}</span>
            </div>

            <div className="flex justify-between text-lg">
              <span className="font-medium">Tax (18% GST):</span>
              <span className="font-semibold">${taxPrice}</span>
            </div>

            <div className="flex justify-between text-lg">
              <span className="font-medium">Shipping:</span>
              <span className="font-semibold">
                {shippingPrice === "0.00" ? "Free" : `$${shippingPrice}`}
              </span>
            </div>

            <hr className="border-gray-300 my-3" />

            <div className="flex justify-between text-xl font-bold text-gray-900">
              <span>Total:</span>
              <span>${totalPrice}</span>
            </div>
          </div>

          <button
            className="w-full bg-blue-600 text-white text-lg py-3 rounded-lg mt-4 hover:bg-blue-700 transition"
            onClick={() => navigate("/shipping")}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartScreen;
