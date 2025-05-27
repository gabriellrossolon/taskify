import { FiArrowRight, FiArrowLeft, FiTrash } from "react-icons/fi";

const TaskCard = ({ cardType, task, moveToNext, moveToPrevious, taskStatus, deleteTask }) => {
  return (
    <div className="bg-gray-400 rounded-md w-full">
      <div className="bg-gray-800 rounded-t-md h-1 shadow-md shadow-black/10"></div>

      <div className="flex items-center justify-between p-2">
        <div className="w-6 flex justify-center">
          {cardType === taskStatus.COMPLETED ||
          cardType === taskStatus.DOING ? (
            <FiArrowLeft
              className="text-xl bg-gray-800 rounded-full text-white cursor-pointer"
              onClick={() => moveToPrevious(task.id)}
            />
          ) : (
            <span className="w-5 h-5 invisible" />
          )}
        </div>

        <h3 className="text-black text-center flex-1">{task.text}</h3>

        <div className="w-6 flex justify-center">
          {cardType === taskStatus.TO_DO || cardType === taskStatus.DOING ? (
            <FiArrowRight
              className="text-xl bg-gray-800 rounded-full text-white cursor-pointer"
              onClick={() => moveToNext(task.id)}
            />
          ) : (
            <FiTrash className="cursor-pointer text-gray-800 text-xl" onClick={() => deleteTask(task.id)}/>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
