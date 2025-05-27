import { useState, useEffect } from "react";
import TaskBoard from "./components/TaskBoard";
import { FiUser, FiMenu } from "react-icons/fi";
import api from "./services/api";

function App() {
  const TaskStatus = {
    TO_DO: "toDo",
    DOING: "doing",
    COMPLETED: "completed",
  };

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get("/task");
        const apiTasks = response.data.map((t) => ({
          id: t.id,
          text: t.title,
          status: t.isDone
            ? TaskStatus.COMPLETED
            : t.isDoing
            ? TaskStatus.DOING
            : TaskStatus.TO_DO,
        }));
        setTasks(apiTasks);
      } catch (err) {
        console.error("Erro ao carregar tarefas:", err);
      }
    };

    fetchTasks();
  }, []);

  const addTask = (text) => {
    api
      .post("/task", {
        title: text,
        isDoing: false,
        isDone: false,
      })
      .then((res) => {
        const task = res.data;
        setTasks((prev) => [
          ...prev,
          {
            id: task.id,
            text: task.title,
            status: TaskStatus.TO_DO,
          },
        ]);
      })
      .catch((err) => {
        console.error("Erro ao adicionar tarefa:", err);
      });
  };

  const moveToNext = async (taskId) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    let updatedStatus = task.status;
    if (task.status === TaskStatus.TO_DO) updatedStatus = TaskStatus.DOING;
    else if (task.status === TaskStatus.DOING)
      updatedStatus = TaskStatus.COMPLETED;

    try {
      await api.put(`/task/${taskId}`, {
        id: task.id,
        title: task.text,
        isDoing: updatedStatus === TaskStatus.DOING,
        isDone: updatedStatus === TaskStatus.COMPLETED,
      });

      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? { ...t, status: updatedStatus } : t))
      );
    } catch (err) {
      console.error("Erro ao atualizar tarefa:", err);
    }
  };

  const moveToPrevious = async (taskId) => {
    const taskToUpdate = tasks.find((t) => t.id === taskId);
    if (!taskToUpdate) return;

    let updatedStatus = TaskStatus.TO_DO;
    let isDoing = false;
    let isDone = false;

    if (taskToUpdate.status === TaskStatus.COMPLETED) {
      updatedStatus = TaskStatus.DOING;
      isDoing = true;
    } else if (taskToUpdate.status === TaskStatus.DOING) {
      updatedStatus = TaskStatus.TO_DO;
    }

    try {
      await api.put(`/task/${taskId}`, {
        id: taskId,
        title: taskToUpdate.text,
        isDoing: isDoing,
        isDone: isDone,
      });

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, status: updatedStatus } : task
        )
      );
    } catch (err) {
      console.error("Erro ao mover tarefa:", err);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await api.delete(`/task/${taskId}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-700 flex items-center justify-between py-2 px-4 mb-6">
        <div className="flex items-center justify-center gap-2">
          <FiMenu className="text-white text-3xl cursor-pointer" />
          <h1 className="text-3xl font-bold text-yellow-400">TaskiFy</h1>
        </div>
        <div className="flex items-center justify-center gap-2">
          <p className="text-xl text-white">
            Ola, <strong>Usuário</strong>
          </p>
          <FiUser className="text-4xl text-white rounded-full bg-gray-800 cursor-pointer" />
        </div>
      </header>
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-8 mx-8">
        <TaskBoard
          boardTitle="PENDENTE"
          boardType={TaskStatus.TO_DO}
          tasks={tasks.filter((task) => task.status === TaskStatus.TO_DO)}
          moveToNext={moveToNext}
          moveToPrevious={moveToPrevious}
          onAddTask={addTask}
          taskStatus={TaskStatus}
          deleteTask={deleteTask}
        />
        <TaskBoard
          boardTitle="FAZENDO"
          boardType={TaskStatus.DOING}
          tasks={tasks.filter((task) => task.status === TaskStatus.DOING)}
          moveToNext={moveToNext}
          moveToPrevious={moveToPrevious}
          taskStatus={TaskStatus}
          deleteTask={deleteTask}
        />
        <TaskBoard
          boardTitle="FEITO"
          boardType={TaskStatus.COMPLETED}
          tasks={tasks.filter((task) => task.status === TaskStatus.COMPLETED)}
          moveToNext={moveToNext}
          moveToPrevious={moveToPrevious}
          taskStatus={TaskStatus}
          deleteTask={deleteTask}
        />
      </main>
    </div>
  );
}

export default App;
