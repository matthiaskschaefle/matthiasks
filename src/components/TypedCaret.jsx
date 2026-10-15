import { motion } from "framer-motion";

export default function TypedCaret({ className }) {
  return (
    <motion.span
      className={className}
      aria-hidden="true"
      initial={{ opacity: 1 }}
      animate={{ opacity: [0, 1, 1, 0] }}
      transition={{
        duration: 0.85,
        repeat: Infinity,
        repeatDelay: 0.12,
        times: [0, 0.08, 0.58, 1],
      }}
    />
  );
}
