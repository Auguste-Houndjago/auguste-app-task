import React from "react";
import { motion } from "framer-motion";

function ElipsisMenu({ type, setOpenEditModal, setOpenDeleteModal }) {
  const menuVariants = {
    hidden: { rotate: -90, opacity: 0 },
    visible: { rotate: 0, opacity: 1 },
  };
  

  return (
    <motion.div
      className={
        type === "Boards"
          ? "absolute top-16 right-5"
          : "absolute top-6 right-4"
      }
      initial="hidden"
      animate="visible"
      variants={menuVariants}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-end items-center">
        <motion.div
          className="w-40 text-sm z-50 font-medium shadow-md shadow-[#364e7e1a] bg-white dark:bg-[#20212c] space-y-4 py-5 px-4 rounded-lg h-auto pr-12"
          whileHover={{ scale: 1.05 }}
        >
          <motion.p
            onClick={() => {
              setOpenEditModal();
            }}
            className="cursor-pointer dark:text-gray-400 text-gray-700"
            whileHover={{ scale: 1.1, color: "#555" }}
          >
            Edit {type}
          </motion.p>

          <motion.p
            onClick={() => setOpenDeleteModal()}
            className="cursor-pointer text-red-500"
            whileHover={{ scale: 1.1, color: "#ff0000" }}
          >
            Delete {type}
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default ElipsisMenu;
