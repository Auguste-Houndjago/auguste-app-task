import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch } from "@headlessui/react";
import { motion } from "framer-motion";
import boardIcon from "../assets/task.png";
import boardIconplus from "../assets/creat.png";
import useDarkMode from "../hooks/useDarkMode";
import darkIcon from "../assets/icon-dark-theme.svg";
import lightIcon from "../assets/icon-light-theme.svg";
import showSidebarIcon from "../assets/icon-show-sidebar.svg";
import hideSidebarIcon from "../assets/icon-hide-sidebar.svg";
import boardsSlice from "../redux/boardsSlice";
import AddEditBoardModal from "../modals/AddEditBoardModal";

function Sidebar({ isSideBarOpen, setIsSideBarOpen }) {
  const dispatch = useDispatch();
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const [colorTheme, setTheme] = useDarkMode();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );

  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  const boards = useSelector((state) => state.boards);

  const toggleSidebar = () => {
    setIsSideBarOpen((curr) => !curr);
  };

  const containerVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        delay: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        delay: 0.2,
      },
    },
  };

  return (
    <div>
      <motion.div
        className={
          isSideBarOpen
            ? `min-w-[261px] bg-white dark:bg-[#2b2c37] fixed top-[72px] h-screen items-center left-0 z-20`
            : `bg-[#635FC7] dark:bg-[#2b2c37] dark:hover:bg-[#635FC7] top-auto bottom-10 justify-center items-center hover:opacity-80 cursor-pointer p-0 transition duration-300 transform fixed flex w-[56px] h-[48px] rounded-r-full`
        }
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div>
          {isSideBarOpen && (
            <motion.div
              className="bg-white dark:bg-[#2b2c37] w-full py-4 rounded-xl"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <h3 className="dark:text-gray-300 text-gray-600 font-semibold mx-4 mb-8">
                ALL BOARDS ({boards?.length})
              </h3>

              <motion.div
                className="dropdown-board flex flex-col h-[70vh] justify-between"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
              >
                <div>
                  {boards.map((board, index) => (
                    <motion.div
                      className={`flex items-baseline space-x-2 px-5 mr-8 rounded-2xl my-4 duration-500 ease-in-out py-4 cursor-pointer hover:bg-[#635fc71a] hover:text-[#635fc7] dark:hover:bg-white dark:hover:text-[#635fc7] dark:text-white ${
                        board.isActive &&
                        "bg-[#635fc7] rounded-r-full text-white mr-8"
                      }`}
                      key={index}
                      onClick={() => {
                        dispatch(boardsSlice.actions.setBoardActive({ index }));
                      }}
                      initial="hidden"
                      animate="visible"
                      variants={itemVariants}
                    >
                      <img src={boardIcon} className="h-4" />
                      <p className="text-lg font-bold">{board.name}</p>
                    </motion.div>
                  ))}

                  <motion.div
                    className="flex items-baseline space-x-2 mr-8 rounded-r-md duration-500 ease-in-out cursor-pointer text-[#635fc7] px-5 py-4 hover:bg-[#635fc71a] hover:text-[#635fc7] dark:hover:bg-white"
                    onClick={() => {
                      setIsBoardModalOpen(true);
                    }}
                    initial="hidden"
                    animate="visible"
                    variants={itemVariants}
                  >
                    <img src={boardIconplus} className="h-6" />
                    <p className="text-lg font-bold -translate-y-1">Create New Board</p>
                  </motion.div>
                </div>

                <motion.div
                  className="mx-2 p-4 relative space-x-2 bg-slate-100 dark:bg-[#20212c] flex justify-center items-center rounded-lg"
                  initial="hidden"
                  animate="visible"
                  variants={itemVariants}
                >
                  <img src={lightIcon} alt="sun indicating light mode" />

                  <Switch
                    checked={darkSide}
                    onChange={toggleDarkMode}
                    className={`${
                      darkSide ? "bg-[#635fc7]" : "bg-gray-200"
                    } relative inline-flex h-6 w-11 items-center rounded-full`}
                  >
                    <span
                      className={`${
                        darkSide ? "translate-x-6" : "translate-x-1"
                      } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                    />
                  </Switch>

                  <img src={darkIcon} alt="moon indicating dark mode" />
                </motion.div>
              </motion.div>
            </motion.div>
          )}

          {isSideBarOpen ? (
            <motion.div
              onClick={() => toggleSidebar()}
              className="flex items-center mt-2 absolute bottom-16 text-lg font-bold rounded-r-full hover:text-[#635FC7] cursor-pointer mr-6 mb-8 px-8 -py-8 hover:bg-[#635fc71a] dark:hover:bg-white space-x-2 justify-center my-4 text-gray-500"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <img
                className="min-w-[20px]"
                src={hideSidebarIcon}
                alt="side bar show/hide"
              />
              {isSideBarOpen && <p> Hide Sidebar </p>}
            </motion.div>
          ) : (
            <motion.div
              className="absolute p-5"
              onClick={() => toggleSidebar()}
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <img src={showSidebarIcon} alt="showSidebarIcon" />
            </motion.div>
          )}
        </div>
      </motion.div>

      {isBoardModalOpen && (
        <AddEditBoardModal
          type="add"
          setIsBoardModalOpen={setIsBoardModalOpen}
        />
      )}
    </div>
  );
}

export default Sidebar;
