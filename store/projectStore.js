import { makeAutoObservable, runInAction } from "mobx";
import { createContext, useContext, useState } from "react";

class ProjectStore {
  projects = [];
  loading = false;
  error = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchProjects(email) {
    this.loading = true;
    try {
      const res = await fetch(`/api/projects?email=${email}`);
      const data = await res.json();
      if (res.ok) {
        runInAction(() => {
          this.projects = data.data;
          this.error = null;
        });
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      runInAction(() => {
        this.error = err.message;
      });
    } finally {
      runInAction(() => { this.loading = false });
    }
  }

  async addProject({ email, title, description }) {
    try {
      const res = await fetch(`/api/projects?email=${email}`, {
        method: "POST",
        body: JSON.stringify({ title, description }),
      });
      const data = await res.json();
      if (res.ok) {
        runInAction(() => {
          this.projects.push(data.data);
        });
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      runInAction(() => { this.error = err.message });
    }
  }

  async editProject(email, projectId, updatedProject) {
    try {
      const res = await fetch(`/api/projects/${projectId}?email=${email}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProject),
      });
      const data = await res.json();
      if (res.ok) {
        runInAction(() => {
          const idx = this.projects.findIndex(p => p.projectId === projectId);
          if (idx !== -1) this.projects[idx] = data.data;
        });
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      runInAction(() => { this.error = err.message });
    }
  }

  async deleteProject(email, projectId) {
    try {
      const res = await fetch(`/api/projects/${projectId}?email=${email}`, {
        method: "DELETE"
      });
      const data = await res.json();
      if (res.ok) {
        runInAction(() => {
          this.projects = this.projects.filter(p => p.projectId !== projectId);
        });
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      runInAction(() => { this.error = err.message });
    }
  }
}

const ProjectStoreContext = createContext(null);

export const ProjectStoreProvider = ({ children }) => {
  const [store] = useState(() => new ProjectStore());
  return (
    <ProjectStoreContext.Provider value={store}>
      {children}
    </ProjectStoreContext.Provider>
  );
};

export const useProjectStore = () => useContext(ProjectStoreContext);