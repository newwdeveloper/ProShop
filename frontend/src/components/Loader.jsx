const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="relative -mt-50">
        {" "}
        {/* Moves the spinner up */}
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default Loader;
