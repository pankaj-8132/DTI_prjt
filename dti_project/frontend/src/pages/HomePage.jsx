import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const images = ["/fashion1.jpg", "/fashion2.jpg", "/fashion3.jpg"];

const Slideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

return (

      <AnimatePresence mode="wait">
        <motion.div
          key={images[currentIndex]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={images[currentIndex]}
            alt="Slideshow"
            // className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>
    // </div>
  );
};

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className='relative w-full min-h-screen text-white bg-black'>
      {/* Slideshow */}
      <Slideshow />

      {/* Header */}
      <header className='flex justify-between items-center px-10 py-6 bg-black bg-opacity-80 fixed w-full z-50'>
        <h1 className='text-4xl font-extrabold text-green-400'>Fashion AI</h1>
        <div className='flex gap-4'>
          <button onClick={() => navigate("/signup")} className='bg-green-500 px-6 py-2 text-lg rounded hover:bg-green-600'>Sign Up</button>
          <button onClick={() => navigate("/login")} className='bg-emerald-500 px-6 py-2 text-lg rounded hover:bg-emerald-600'>Login</button>
        </div>
      </header>

      {/* Hero Section */}
      <section className='relative z-10 flex flex-col justify-center items-center h-screen text-center px-6 pt-20 bg-gradient-to-b from-black/80 to-transparent'>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='text-5xl font-bold mb-4'
        >
          Discover Your Style with Fashion AI
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className='text-xl text-gray-300 max-w-2xl'
        >
          AI-powered fashion assistant to help you find the perfect look for any occasion.
        </motion.p>
      </section>

      {/* Categories Section */}
      <section className='relative z-10 py-20 px-10 bg-black bg-opacity-70'>
        <h3 className='text-4xl font-semibold mb-10 text-center'>Explore Our Fashion Categories</h3>
        <div className='grid md:grid-cols-3 gap-8'>
          <div className='bg-gray-900 p-6 rounded-lg shadow-lg hover:bg-gray-800 transition'>
            <h4 className='text-2xl font-bold mb-2'>Summer Styles</h4>
            <p className='text-gray-400'>Breezy, bold, and trending looks to beat the heat.</p>
          </div>
          <div className='bg-gray-900 p-6 rounded-lg shadow-lg hover:bg-gray-800 transition'>
            <h4 className='text-2xl font-bold mb-2'>Winter Collection</h4>
            <p className='text-gray-400'>Stay warm with style using our curated winter looks.</p>
          </div>
          <div className='bg-gray-900 p-6 rounded-lg shadow-lg hover:bg-gray-800 transition'>
            <h4 className='text-2xl font-bold mb-2'>AI Picks</h4>
            <p className='text-gray-400'>Let AI craft personalized fashion just for you.</p>
          </div>
        </div>
      </section>

      {/* Trending Vlogs Section */}
      <section className='relative z-10 py-20 px-10 bg-black'>
        <h3 className='text-4xl font-semibold mb-10 text-center'>Trending Fashion Vlogs</h3>
        <div className='grid md:grid-cols-3 gap-8'>
          {[1, 2, 3].map((num) => (
            <div key={num} className='bg-gray-900 p-4 rounded-lg shadow hover:bg-gray-800'>
              <div className='h-48 bg-gray-700 rounded mb-4'></div>
              <h4 className='text-xl font-bold'>Vlog Title {num}</h4>
              <p className='text-gray-400 mt-2'>Brief description about the vlog content and fashion tips.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Become a Model Section */}
      <section className='relative z-10 py-20 px-10 bg-black bg-opacity-80'>
        <div className='text-center max-w-2xl mx-auto'>
          <h3 className='text-4xl font-semibold mb-6'>Become a Fashion AI Model</h3>
          <p className='text-gray-300 text-lg mb-8'>
            Do you love fashion and want to be featured in our next AI-powered collection? Join our model program and showcase your unique style to the world.
          </p>
          <button
            onClick={() => navigate("/become-model")}
            className='bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 text-lg rounded-lg shadow-lg transition'
          >
            Become a Model
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className='bg-black bg-opacity-90 py-10 text-center text-sm text-gray-400'>
        <p>&copy; 2025 Fashion AI. All rights reserved.</p>
        <p className='text-gray-500 mt-2 max-w-3xl mx-auto'>
          Fashion AI is your one-stop smart style guide. From AI outfit generators to fashion trend vlogs, we bring tomorrow’s fashion tech to your wardrobe today.
        </p>
        <div className='mt-6 flex justify-center gap-6 text-lg'>
          <a href='#' className='hover:text-pink-400 transition'>Instagram</a>
          <a href='#' className='hover:text-blue-400 transition'>Twitter</a>
          <a href='#' className='hover:text-blue-600 transition'>Facebook</a>
        </div>
        <div className='mt-8'>
          <button
            onClick={() => navigate("/admin-login")}
            className='text-green-400 hover:text-green-600 underline transition duration-300'
          >
            Admin Login
          </button>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
