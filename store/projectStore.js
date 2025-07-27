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
      createdAt: new Date(),
      users: [],
      tasks: []
    };
    this.projects.push(newProject);
  }

  addTask(projectId, task) {
    const project = this.projects.find(p => p.projectId === projectId);
    if (project) {
      project.tasks.push({ ...task, taskId: uuidv4() });
    }
  }

  filterTasks(projectId, { status, priority, query }) {
    const project = this.projects.find(p => p.projectId === projectId);
    if (!project) return [];

    return project.tasks.filter(task =>
      (status ? task.status === status : true) &&
      (priority ? task.priority === priority : true) &&
      (query ? task.title.includes(query) || task.description.includes(query) : true)
    );
  }
}

const ProjectStoreContext = createContext(new ProjectStore());

export const ProjectStoreProvider = ({ children }) => (
  <ProjectStoreContext.Provider value={new ProjectStore()}>
    {children}
  </ProjectStoreContext.Provider>
);

export const useProjectStore = () => useContext(ProjectStoreContext);