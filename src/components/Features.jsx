import { motion } from "framer-motion";
import { FaLock, FaBolt, FaCloud } from "react-icons/fa";

const features = [
  {
    icon: <FaLock className="text-yellow-400 mx-auto mb-4 text-6xl" />,
    title: "Secure Notes",
    desc: "Your secrets are encrypted and safe. Only you can access them.",
  },
  {
    icon: <FaBolt className="text-yellow-400 mx-auto mb-4 text-6xl" />,
    title: "Fast Access",
    desc: "Log in anytime, anywhere. Your vault is always ready.",
  },
  {
    icon: <FaCloud className="text-yellow-400 mx-auto mb-4 text-6xl" />,
    title: "Cloud Synced",
    desc: "Everything you store syncs in real-time to the cloud.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 bg-white text-gray-800 px-6">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl font-bold text-indigo-600 mb-4">
          Features That Protect You
        </h2>
        <p className="text-lg text-gray-500">
          Everything you need to feel safe, secure, and organized.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2, duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-md p-8 text-center hover:shadow-xl transition-all border-t-4 border-yellow-300"
          >
            {feature.icon}
            <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Features;
