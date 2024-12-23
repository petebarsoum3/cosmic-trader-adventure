import { motion } from "framer-motion";

const features = [
  {
    icon: "💎",
    title: "AI-Powered Trading",
    description: "Advanced algorithms maximize your profits",
  },
  {
    icon: "🚀",
    title: "Lightning Fast",
    description: "Execute trades in milliseconds",
  },
  {
    icon: "🛡️",
    title: "Risk Management",
    description: "Smart stop-loss and take-profit",
  },
  {
    icon: "📊",
    title: "Real-time Analytics",
    description: "Track your performance live",
  },
];

export function Features() {
  return (
    <div className="py-20">
      <h2 className="text-3xl font-bold text-center mb-12 text-cyber-primary">
        Advanced Trading Features
      </h2>
      <div className="grid md:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            whileHover={{ y: -5 }}
            transition={{ delay: index * 0.1 }}
            className="cyber-card text-center"
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-bold mb-2 text-cyber-primary">
              {feature.title}
            </h3>
            <p className="text-gray-400">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}