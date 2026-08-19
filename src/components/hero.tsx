import { useState } from "react";
import SearchFilter from "./search";

function Hero() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <section className="hidden md:block px-6 md:px-8  lg:px-7 mt-2">
        <section className="relative w-full h-[80vh] flex flex-col items-center  justify-center rounded-3xl bg-gray-900">
          <div className="absolute inset-0">
            <img
              src="/assets/hero.jpg"
              alt="background real estate"
              className="sm:none lg: w-full h-full rounded-3xl"
            />
            <div className="absolute inset-0 bg-black/50 rounded-3xl" />
          </div>
          <div className="relative z-10 text-center text-white px-4 max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold">
              Find Your Dream Home
            </h1>
            <p className="mt-4 text-lg md:text-xl">
              Browse exclusive properties with refined search filters.
            </p>
          </div>
          <div className="z-50 w-full px-4 mt-8">
            <SearchFilter />
          </div>
        </section>
      </section>

      <section className="block md:hidden px-4 mt-2">
        <div className="relative w-full h-[50vh] flex flex-col items-center justify-center rounded-2xl bg-gray-900">
          <img
            src="/assets/hero.jpg"
            alt="real estate"
            className="absolute inset-0 w-full h-full object-cover rounded-2xl"
          />
          <div className="absolute inset-0 bg-black/50 rounded-2xl" />

          <div className="relative z-10 text-center text-white px-2">
            <h1 className="text-xl font-bold">Find Your Dream Home</h1>
            <p className=" text-sm">Browse exclusive properties</p>

            <div className="mt-4 flex gap-3 justify-center">
              <button className="border border-blue-600 text-blue-600 bg-white px-4 py-2 rounded-sm font-medium shadow-md hover:bg-blue-50 transition">
                Explore
              </button>
              <button
                onClick={() => setIsOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-sm font-medium shadow-md hover:bg-blue-700 transition"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-11/12 max-w-md shadow-lg relative">
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-3 text-gray-600 hover:text-black"
              >
                ✕
              </button>

              <SearchFilter />
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default Hero;
