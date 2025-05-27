import { useState } from "react";
import { FiPlusSquare, FiMinus, FiPlus } from "react-icons/fi";
import TaskCard from "./TaskCard";

const TaskBoard = ({
  boardTitle,
  boardType,
  tasks = [],
  onAddTask,
  moveToNext,
  moveToPrevious,
  taskStatus,
  deleteTask
}) => {
  const [newTaskText, setNewTaskText] = useState("");
  const [showInput, setShowInput] = useState(false);

  const handleAdd = () => {
    if (!newTaskText.trim()) return;
    onAddTask(newTaskText.trim());
    setNewTaskText("");
    setShowInput(false);
  };

  return (
    <div className="col-span-1">
      <div className="bg-gray-700 rounded-xl text-center flex flex-col items-center justify-start min-h-32 w-full pb-2">
        <div className="flex items-center justify-between w-full bg-yellow-400 rounded-t-xl p-1">
          {boardType === taskStatus.TO_DO ? (
            !showInput ? (
              <FiPlusSquare
                className="text-black text-3xl font-bold cursor-pointer"
                onClick={() => setShowInput(true)}
              />
            ) : (
              <FiMinus
                className="text-black text-3xl font-bold cursor-pointer"
                onClick={() => setShowInput(false)}
              />
            )
          ) : (
            <div className="w-10" />
          )}
          <h2 className="text-black text-2xl font-bold select-none text-center flex-1 tracking-wider">
            {boardTitle}
          </h2>
          <div className="w-10" />{" "}
        </div>

        <div className="w-full px-2">
          {showInput && (
            <div className="relative w-full mt-2">
              <input
                type="text"
                placeholder="Nova tarefa"
                className="w-full p-2 pr-10 rounded border border-black/50"
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAdd();
                  }
                }}
              />
              <button
                className="absolute inset-y-0 right-0 p-1 text-white bg-green-600 rounded-r hover:bg-green-700 cursor-pointer"
                onClick={() => {
                  handleAdd();
                }}
              >
                <FiPlus className="text-3xl" />
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col items-start w-full mt-4 px-2 gap-2">
          {tasks.map((task, index) => (
            <TaskCard
              key={index}
              task={task}
              cardType={boardType}
              moveToNext={moveToNext}
              moveToPrevious={moveToPrevious}
              taskStatus={taskStatus}
              deleteTask={deleteTask}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskBoard;
