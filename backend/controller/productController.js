import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

//@desc get  product by id
//route GET/api/products/:id
//@accesss public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    return res.json(product); // ✅ Stops execution after sending response
  }

  res.status(404);
  throw new Error("resource not found");
});

//@desc get all products
//route GET/api/products
//@accesss public
const getProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({});
    if (!products) {
      throw new Error("No products found"); // ❌ Error only if products are missing
    }
    res.json(products); // ✅ Sends products if found
  } catch (error) {
    res.status(500);
    throw new Error("Error fetching all products"); // Sends error to middleware
  }
});

export { getProducts, getProductById };
