import Product from "../components/Product";
import products from "../products";

const HomeScreen = () => {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Product List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="flex justify-center">
            <Product product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;
