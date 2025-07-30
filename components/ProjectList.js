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
    <ul className="space-y-4">
      {projectStore.projects.map((project) => (
        <li key={project.projectId} className="border border-gray-300 p-4 rounded-lg shadow-sm hover:shadow-md transition-all">
          {editingProjectId === project.projectId ? (
            <>
              <input
                type="text"
                value={editingProject.title}
                onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                className="border p-2 mb-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Project Title"
              />
              <textarea
                value={editingProject.description}
                onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                className="border p-2 mb-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Project Description"
              />
              <div className="flex space-x-4">
                <button onClick={handleUpdateProject} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
                  Update Project
                </button>
                <button onClick={() => setEditingProjectId(null)} className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition">
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <div className="flex justify-between items-center">
              <Link href={`/projects/${project.projectId}`} className="text-xl font-semibold text-blue-600 hover:text-blue-800 transition">
                {project.title}
              </Link>
              <div className="flex space-x-2">
                <button onClick={() => handleEdit(project)} className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition">
                  Edit
                </button>
                <button onClick={() => handleDelete(project.projectId)} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
                  Delete
                </button>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
});

export default ProjectList;