
function LoadingPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F8F9F7] px-4">
      <div className="w-full max-w-md text-center">

        {/* Cooking Animation */}
        <div className="relative mx-auto mb-10 flex h-40 w-40 items-center justify-center">

          {/* Animated Steam */}
          <div className="absolute top-0 z-20 flex gap-5">
            <span className="steam steam-one"></span>
            <span className="steam steam-two"></span>
            <span className="steam steam-three"></span>
          </div>

          {/* Burner Flames */}
          <div className="burner-flames absolute bottom-3 z-0 flex items-end justify-center gap-2">
            <span className="flame flame-one"></span>
            <span className="flame flame-two"></span>
            <span className="flame flame-three"></span>
          </div>

          {/* Cooking Pot */}
          <div className="relative z-10 mt-8 animate-bounce">
            <div className="absolute -left-5 top-5 h-5 w-7 rounded-l-full border-4 border-green-800"></div>
            <div className="absolute -right-5 top-5 h-5 w-7 rounded-r-full border-4 border-green-800"></div>

            <div className="h-20 w-28 rounded-b-3xl rounded-t-lg border-4 border-green-800 bg-green-600 shadow-lg">
              <div className="mx-auto mt-3 h-2 w-16 rounded-full bg-green-300"></div>
            </div>

            <div className="absolute -top-2 left-[-8px] h-3 w-32 rounded-full bg-green-800"></div>
            <div className="absolute -top-5 left-10 h-3 w-8 rounded-full bg-green-800"></div>
          </div>

          {/* Burner Base */}
          <div className="absolute bottom-1 z-10 h-3 w-28 rounded-full border-2 border-gray-500 bg-gray-700 shadow-md"></div>

        </div>

        {/* Loading Text */}
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Cooking something delicious!
        </h1>

        <p className="mt-3 text-sm leading-relaxed text-gray-500 sm:text-base">
          Our AI chef is combining your ingredients
          to create the perfect recipe.
        </p>

        {/* Progress Indicators */}
        <div className="mt-10 flex justify-center gap-2">
          <span className="loading-dot"></span>
          <span className="loading-dot"></span>
          <span className="loading-dot"></span>
        </div>

        <p className="mt-4 text-xs font-medium tracking-wide text-green-700">
          PLEASE WAIT WHILE WE PREPARE YOUR RECIPE
        </p>

      </div>
    </main>
  );
}

export default LoadingPage;
