import { makeAutoObservable } from "mobx";
import { createContext, useContext } from "react";
import { v4 as uuidv4 } from 'uuid';

class ProjectStore {
  projects = [];

  constructor() {
    makeAutoObservable(this);
  }

  addProject({ title, description }) {
    const newProject = {
      projectId: uuidv4(),
      title,
      description,
      users: [],
      createdAt: new Date(),
      tasks: []
    };
    this.projects.push(newProject);
  }

  editProject(projectId, updatedProject) {
    const projectIndex = this.projects.findIndex(p => p.projectId === projectId);
    if (projectIndex !== -1) {
      this.projects[projectIndex] = { ...this.projects[projectIndex], ...updatedProject };
    }
  }

  deleteProject(projectId) {
    this.projects = this.projects.filter(p => p.projectId !== projectId);
  }
}

const ProjectStoreContext = createContext(new ProjectStore());

export const ProjectStoreProvider = ({ children }) => {
  const store = useContext(ProjectStoreContext);
  return (
    <ProjectStoreContext.Provider value={store}>
      {children}
    </ProjectStoreContext.Provider>
  );
};

export const useProjectStore = () => useContext(ProjectStoreContext);