import { motion } from "framer-motion";

const Contact = () => {
  return (
    <section
      id="contact"
      className="snap-start min-h-screen flex flex-col justify-center bg-gradient-to-bl from-indigo-800 via-purple-700 to-pink-600 text-white py-10 px-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="max-w-3xl mx-auto text-center"
      >
        <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
        <p className="text-lg mb-12">
          Have questions, feedback, or just want to say hi? We'd love to hear from you.
        </p>

        <form className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-yellow-300"
              required
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-yellow-300"
              required
            />
          </div>
          <div>
            <textarea
              placeholder="Your Message"
              rows="5"
              className="w-full p-3 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-yellow-300"
              required
            ></textarea>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            type="submit"
            className="bg-yellow-300 text-black font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-yellow-400 transition"
          >
            Send Message
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
};

export default Contact;
