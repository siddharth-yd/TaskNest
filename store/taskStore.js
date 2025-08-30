import { makeAutoObservable, runInAction } from "mobx";
import { createContext, useContext, useState } from "react";

class TaskStore {
  tasks = [];
  loading = false;
  error = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchTasks(email, projectId) {
    this.loading = true;
    try {
      const res = await fetch(`/api/projects/${projectId}/tasks?email=${email}`);
      const data = await res.json();
      if (res.ok) {
        runInAction(() => {
          this.tasks = data.data;
          this.error = null;
        });
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      runInAction(() => { this.error = err.message });
    } finally {
      runInAction(() => { this.loading = false });
    }
  }

  async addTask(email, projectId, task) {
    try {
      const res = await fetch(`/api/projects/${projectId}/tasks?email=${email}`, {
        method: "POST",
        body: JSON.stringify(task),
      });
      if (!res.ok) throw new Error("Failed to add task");
      // ✅ Refetch to refresh state
      await this.fetchTasks(email, projectId);
    } catch (err) {
      runInAction(() => this.error = err.message);
    }
  }

  async editTask(email, projectId, taskId, updatedTask) {
    try {
      const res = await fetch(`/api/projects/${projectId}/tasks/${taskId}?email=${email}`, {
        method: "PUT",
        body: JSON.stringify(updatedTask)
      });
      const data = await res.json();
      if (res.ok) {
        runInAction(() => {
          const idx = this.tasks.findIndex(t => t.taskId === taskId);
          if (idx !== -1) this.tasks[idx] = data.data;
        });
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      runInAction(() => { this.error = err.message });
    }
  }

  async deleteTask(email, projectId, taskId) {
    try {
      const res = await fetch(`/api/projects/${projectId}/tasks/${taskId}?email=${email}`, {
        method: "DELETE"
      });
      const data = await res.json();
      if (res.ok) {
        runInAction(() => {
          this.tasks = this.tasks.filter(t => t.taskId !== taskId);
        });
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      runInAction(() => { this.error = err.message });
    }
  }

  getTasksByProjectId(projectId) {
    return this.tasks.filter(t => t.projectId === projectId);
  }
}

const TaskStoreContext = createContext(null);

export const TaskStoreProvider = ({ children }) => {
  const [store] = useState(() => new TaskStore());
  return (
    <TaskStoreContext.Provider value={store}>
      {children}
    </TaskStoreContext.Provider>
  );
};

export const useTaskStore = () => useContext(TaskStoreContext);