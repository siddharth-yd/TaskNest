import { useState } from "react";
import { observer } from "mobx-react-lite";
import { useProjectStore } from "../store/projectStore";
import { useUserStore } from "../store/userStore";
import Link from "next/link";
import { Pencil, Trash2, Check, X } from "lucide-react";

const ProjectList = observer(() => {
  const projectStore = useProjectStore();
  const userStore = useUserStore();
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [editingProject, setEditingProject] = useState(null);

  const handleEdit = (project) => {
    setEditingProjectId(project.projectId);
    setEditingProject(project);
  };

  const handleUpdateProject = () => {
    if (editingProject) {
      projectStore.editProject(userStore.email, editingProjectId, editingProject);
      setEditingProjectId(null);
      setEditingProject(null);
    }
  };

  const handleDelete = (projectId) => {
    projectStore.deleteProject(userStore.email, projectId);
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projectStore.projects.map((project) => (
        <div
          key={project.projectId}
          className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all p-5 flex flex-col justify-between"
        >
          {editingProjectId === project.projectId ? (
            <div>
              <input
                type="text"
                value={editingProject.title}
                onChange={(e) =>
                  setEditingProject({ ...editingProject, title: e.target.value })
                }
                className="border border-gray-300 p-2 mb-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Project Title"
              />
              <textarea
                value={editingProject.description}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    description: e.target.value,
                  })
                }
                className="border border-gray-300 p-2 mb-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Project Description"
                rows={3}
              />
              <div className="flex space-x-3">
                <button
                  onClick={handleUpdateProject}
                  className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  <Check size={16} />
                  <span>Save</span>
                </button>
                <button
                  onClick={() => setEditingProjectId(null)}
                  className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
                >
                  <X size={16} />
                  <span>Cancel</span>
                </button>
              </div>
            </div>
          ) : (
            <>
              <div>
                <Link
                  href={`/projects/${project.projectId}`}
                  className="text-lg font-semibold text-blue-600 hover:text-blue-800 transition"
                >
                  {project.title}
                </Link>
                {project.description && (
                  <p className="text-gray-600 mt-2 text-sm">
                    {project.description}
                  </p>
                )}
              </div>
              <div className="flex space-x-3 mt-4">
                <button
                  onClick={() => handleEdit(project)}
                  className="flex items-center space-x-1 bg-yellow-500 text-white px-3 py-2 rounded-lg hover:bg-yellow-600 transition"
                >
                  <Pencil size={16} />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(project.projectId)}
                  className="flex items-center space-x-1 bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  <Trash2 size={16} />
                  <span>Delete</span>
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
});

export default ProjectList;
