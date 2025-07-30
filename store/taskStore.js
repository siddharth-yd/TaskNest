import { makeAutoObservable } from "mobx";
import { createContext, useContext } from "react";
import { v4 as uuidv4 } from 'uuid';

class TaskStore {
  tasks = [];

  constructor() {
    makeAutoObservable(this);
  }

  addTask({ title, description, projectId }) {
    const newTask = {
      taskId: uuidv4(),
      title,
      description,
      projectId,
      status: "To Do",
      priority: "Low",
      tags: [],
      dueDate: new Date(),
    };
    this.tasks.push(newTask);
  }

  editTask(taskId, updatedTask) {
    const taskIndex = this.tasks.findIndex(t => t.taskId === taskId);
    if (taskIndex !== -1) {
      this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...updatedTask };
    }
  }

  deleteTask(taskId) {
    this.tasks = this.tasks.filter(t => t.taskId !== taskId);
  }

  getTasksByProjectId(projectId) {
    return this.tasks.filter(task => task.projectId === projectId);
  }
}

const TaskStoreContext = createContext(new TaskStore());

export const TaskStoreProvider = ({ children }) => {
  const store = useContext(TaskStoreContext);

  return (
    <TaskStoreContext.Provider value={store}>
      {children}
    </TaskStoreContext.Provider>
  );
};

export const useTaskStore = () => useContext(TaskStoreContext);