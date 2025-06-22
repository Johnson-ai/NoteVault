import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-indigo-900 text-white py-4 px-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4"
      >
        <div className="text-center md:text-left">
          <h3 className="text-2xl font-bold mb-1">NoteVault</h3>
          <p className="text-xs text-gray-300">
            Your secrets. Your notes. Fully private & secure.
          </p>
        </div>

        <div className="flex space-x-6 text-gray-300 text-xs">
          <a href="#features" className="hover:text-yellow-300 transition">
            Features
          </a>
          <a href="#about" className="hover:text-yellow-300 transition">
            About
          </a>
          <a href="#contact" className="hover:text-yellow-300 transition">
            Contact
          </a>
          <a href="#login" className="hover:text-yellow-300 transition">
            Login
          </a>
        </div>
      </motion.div>

      <div className="text-center mt-4 text-xs text-gray-500">
        © {new Date().getFullYear()} NoteVault. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
