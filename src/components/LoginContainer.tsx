"use client";

import { motion } from "framer-motion";

export function LoginContainer({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
      }}
    >
      {children}
    </motion.div>
  );
}
