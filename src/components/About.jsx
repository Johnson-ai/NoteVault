import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";
import profilePic from "../assets/profile.jpg";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const blob1Variants = {
  animate: {
    x: [0, 20, 0],
    y: [0, -20, 0],
    scale: [1, 1.1, 1],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const blob2Variants = {
  animate: {
    x: [0, -15, 0],
    y: [0, 15, 0],
    scale: [1, 0.9, 1],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const About = () => {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 py-20 px-6 text-gray-800"
    >
      {/* Animated blobs */}
      <motion.div
        className="absolute top-10 left-[-100px] w-72 h-72 bg-pink-400 rounded-full filter blur-3xl opacity-30"
        variants={blob1Variants}
        animate="animate"
        aria-hidden="true"
      />
      <motion.div
        className="absolute bottom-20 right-[-80px] w-96 h-96 bg-indigo-400 rounded-full filter blur-3xl opacity-20"
        variants={blob2Variants}
        animate="animate"
        aria-hidden="true"
      />

      <motion.div
        className="relative max-w-5xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <motion.h2
          className="text-4xl font-bold text-indigo-600 mb-8 text-center md:text-left"
          variants={itemVariants}
        >
          About NoteVault
        </motion.h2>

        <div className="flex flex-col md:flex-row items-center gap-10 mb-12">
          <motion.img
            src={profilePic}
            alt="Profile"
            className="w-40 h-40 rounded-full border-4 border-white shadow-md cursor-pointer hover:scale-105 transition-transform duration-500"
            variants={itemVariants}
            whileHover={{ scale: 1.1, rotate: 5 }}
          />
          <motion.blockquote
            className="text-xl italic text-gray-700 max-w-lg relative pl-12"
            variants={itemVariants}
          >
            <FaQuoteLeft className="absolute left-0 top-0 text-yellow-300 text-3xl" />
            "In a world full of noise, your private thoughts deserve a quiet,
            secure space. That’s what NoteVault gives you."
          </motion.blockquote>
        </div>

        <motion.p className="text-lg text-gray-700 mb-6" variants={itemVariants}>
          NoteVault is your secure digital diary. Built with encryption in mind,
          it gives you a private space to record thoughts, ideas, secrets, or
          anything else you want to keep safe.
        </motion.p>
        <motion.p className="text-lg text-gray-700" variants={itemVariants}>
          Whether you're journaling your day, writing plans, or keeping track of
          sensitive information, NoteVault is here to protect it.
        </motion.p>
      </motion.div>
    </section>
  );
};

export default About;
