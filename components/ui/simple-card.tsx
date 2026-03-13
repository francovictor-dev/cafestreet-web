import { motion, MotionProps } from "motion/react";
import { ComponentProps } from "react";

const SimpleCard = (props: MotionProps & ComponentProps<"div">) => {
  return (
    <motion.div
      {...props}
      className={`p-6 rounded-2xl bg-primary-200 ${props.className}`}
    >
      {props.children}
    </motion.div>
  );
};

export default SimpleCard;
