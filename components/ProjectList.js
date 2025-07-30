import { useState } from 'react';
import { observer } from "mobx-react-lite";
import { useProjectStore } from '../store/projectStore';
import Link from 'next/link';

const ProjectList = observer(() => {
  const projectStore = useProjectStore();
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [editingProject, setEditingProject] = useState(null);

  const handleEdit = (project) => {
    setEditingProjectId(project.projectId);
    setEditingProject(project);
  };

  const handleUpdateProject = () => {
    if (editingProject) {
      projectStore.editProject(editingProjectId, editingProject);
      setEditingProjectId(null);
      setEditingProject(null);
    }
  };

  const handleDelete = (projectId) => {
    projectStore.deleteProject(projectId);
  };

  return (
    <ul>
      {projectStore.projects.map((project) => (
        <li key={project.projectId} className="border p-2 mb-2">
          {editingProjectId === project.projectId ? (
            <>
              <input
                type="text"
                value={editingProject.title}
                onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                className="border p-2 mb-2 w-full"
              />
              <textarea
                value={editingProject.description}
                onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                className="border p-2 mb-2 w-full"
              />
              <button onClick={handleUpdateProject} className="bg-green-500 text-white p-2 w-full">
                Update Project
              </button>
              <button onClick={() => setEditingProjectId(null)} className="bg-gray-500 text-white p-2 w-full mt-2">
                Cancel
              </button>
            </>
          ) : (
            <>
              <Link href={`/projects/${project.projectId}`}>
                {project.title}
              </Link>
              <button onClick={() => handleEdit(project)} className="bg-yellow-500 text-white p-1 ml-2">
                Edit
              </button>
              <button onClick={() => handleDelete(project.projectId)} className="bg-red-500 text-white ml-2 p-1">
                Delete
              </button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
});

export default ProjectList;