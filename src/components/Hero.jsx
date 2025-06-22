import { motion } from "framer-motion";
import { FaArrowRight, FaLock } from "react-icons/fa";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-purple-800 via-indigo-600 to-pink-600 text-white px-6">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="text-center max-w-3xl"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
          Welcome to <span className="text-yellow-300">NoteVault</span>{" "}
          <FaLock className="inline text-yellow-300 ml-2" />
          <br />
          <span className="text-white/80 text-3xl">
            Your Secrets. Your Notes. Your World.
          </span>
        </h1>

        <p className="text-lg md:text-xl text-white/80 mb-10">
          Store your personal thoughts securely. Encrypted, private, and easy.
        </p>

        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          <motion.a
            href="#features"
            className="px-6 py-3 rounded-full bg-yellow-300 text-black font-semibold shadow-md flex items-center gap-2 justify-center hover:scale-105 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More <FaArrowRight />
          </motion.a>

          <motion.a
            href="#signup"
            className="px-6 py-3 rounded-full bg-white text-indigo-600 font-semibold shadow-md flex items-center gap-2 justify-center hover:scale-105 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started <FaArrowRight />
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
