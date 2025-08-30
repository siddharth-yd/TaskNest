import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import { useProjectStore } from "../../store/projectStore";
import { useTaskStore } from "../../store/taskStore";
import { useUserStore } from "../../store/userStore";
import { observer } from "mobx-react-lite";

const ProjectDetail = observer(() => {
  const router = useRouter();
  const { id } = router.query;

  const projectStore = useProjectStore();
  const taskStore = useTaskStore();
  const userStore = useUserStore();

  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ status: "", priority: "", tags: "", query: "" });

  useEffect(() => {
    async function loadData() {
      if (userStore.email && id) {
        if (projectStore.projects.length === 0) {
          await projectStore.fetchProjects(userStore.email);
        }
        await taskStore.fetchTasks(userStore.email, id);
        setLoading(false);
      }
    }
    loadData();
  }, [userStore.email, id]);

  const project = projectStore.projects.find(p => p.projectId === id);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto p-4 text-xl">Loading tasks...</div>
      </>
    );
  }

  if (!project) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto p-4 text-xl text-red-500">
          Project not found
        </div>
      </>
    );
  }

  const handleAddTask = async () => {
    if (!newTask.title.trim()) return;
    await taskStore.addTask(userStore.email, id, { ...newTask, projectId: id });
    await taskStore.fetchTasks(userStore.email, id);
    setNewTask({ title: "", description: "" });
  };

  const handleEditTask = (task) => {
    setEditingTaskId(task.taskId);
    setEditingTask(task);
  };

  const handleUpdateTask = async () => {
    await taskStore.editTask(userStore.email, id, editingTaskId, editingTask);
    await taskStore.fetchTasks(userStore.email, id);
    setEditingTaskId(null);
    setEditingTask(null);
  };

  const handleDeleteTask = async (taskId) => {
    await taskStore.deleteTask(userStore.email, id, taskId);
    await taskStore.fetchTasks(userStore.email, id);
  };

  const filteredTasks = taskStore.tasks.filter(task =>
    (filters.status ? task.status === filters.status : true) &&
    (filters.priority ? task.priority === filters.priority : true) &&
    (filters.query ? task.title.toLowerCase().includes(filters.query.toLowerCase()) ||
      task.description.toLowerCase().includes(filters.query.toLowerCase()) : true) &&
    (filters.tags ? task.tags.some(tag => tag.includes(filters.tags)) : true)
  );

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">{project.title} - Tasks</h1>

        {/* Add Task Form */}
        <div className="bg-white shadow rounded p-6 mb-6">
          <input
            type="text"
            placeholder="Task Title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            className="border p-2 mb-4 w-full rounded"
          />
          <textarea
            placeholder="Task Description"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            className="border p-2 mb-4 w-full rounded"
          />
          <button
            onClick={handleAddTask}
            className="bg-blue-500 text-white py-2 px-4 rounded w-full"
          >
            Add Task
          </button>
        </div>

        {/* Filters */}
        <div className="mb-4 grid grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search"
            value={filters.query}
            onChange={(e) => setFilters({ ...filters, query: e.target.value })}
            className="border p-2 w-full rounded"
          />
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="border p-2 w-full rounded"
          >
            <option value="">All Statuses</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
          <select
            value={filters.priority}
            onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
            className="border p-2 w-full rounded"
          >
            <option value="">All Priorities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <input
            type="text"
            placeholder="Tags"
            value={filters.tags}
            onChange={(e) => setFilters({ ...filters, tags: e.target.value })}
            className="border p-2 w-full rounded"
          />
        </div>

        {/* Task list */}
        <h2 className="text-xl font-semibold mb-4">Tasks</h2>
        <ul className="space-y-4">
          {filteredTasks.map(task => (
            <li key={task.taskId} className="bg-white shadow rounded p-4">
              {editingTaskId === task.taskId ? (
                <>
                  <input
                    type="text"
                    value={editingTask.title}
                    onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                    className="border p-2 mb-2 w-full rounded"
                  />
                  <textarea
                    value={editingTask.description}
                    onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                    className="border p-2 mb-2 w-full rounded"
                  />
                  <select
                    value={editingTask.status}
                    onChange={(e) => setEditingTask({ ...editingTask, status: e.target.value })}
                    className="border p-2 mb-2 w-full rounded"
                  >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                  </select>
                  <button
                    onClick={handleUpdateTask}
                    className="bg-green-500 text-white py-2 px-4 rounded w-full"
                  >
                    Update Task
                  </button>
                </>
              ) : (
                <>
                  <div className="text-lg font-bold">{task.title}</div>
                  <div className="text-sm">{task.description}</div>
                  <div className="mt-2 flex">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{task.status}</span>
                    <span className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-blue-700 mr-2">{task.priority}</span>
                    {task.tags?.length > 0 && (
                      <span className="inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-green-700">
                        {task.tags.join(", ")}
                      </span>
                    )}
                  </div>
                  <div className="mt-2 flex">
                    <button
                      onClick={() => handleEditTask(task)}
                      className="bg-yellow-500 text-white py-1 px-3 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task.taskId)}
                      className="bg-red-500 text-white py-1 px-3 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
});

export default ProjectDetail;