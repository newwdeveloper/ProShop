import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreen from "./screen/HomeScreen";
import ProductScreen from "./screen/ProductScreen";
import CartScreen from "./screen/CartScreen";

const AppLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-3">
        <div className="max-w-6xl mx-auto px-4">
          <Outlet /> {/* This will render the matched route */}
        </div>
      </main>
      <Footer className="mt-auto" />
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />, // Main layout
    children: [
      { element: <HomeScreen />, index: true }, // Nested route
      { path: "product/:id", element: <ProductScreen /> },
      { path: "/cart", element: <CartScreen /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
