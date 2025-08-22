import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home } from "lucide-react";

export default function NoPageFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100 text-center p-6">
      {/* Animated 404 */}
      <motion.h1
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-8xl font-extrabold text-blue-600 drop-shadow-lg"
      >
        404
      </motion.h1>

      {/* Subtitle */}
      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mt-4 text-2xl font-semibold text-slate-800"
      >
        Oops! Page Not Found
      </motion.h2>

      {/* Description */}
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-2 text-slate-600 max-w-md"
      >
        The page you are looking for doesn’t exist or has been moved.
      </motion.p>

      {/* Back to Home Button */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-6"
      >
        <Link
          to="/"
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-medium shadow-md hover:bg-blue-700 transition"
        >
          <Home className="w-5 h-5" />
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}