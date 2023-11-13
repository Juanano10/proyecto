import { motion } from 'framer-motion';

const AnimationOnLogin = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      ¡Has iniciado sesión con éxito!
    </motion.div>
  );
};

export default AnimationOnLogin;