import { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';
import { useProjectStore } from '../../store/projectStore';

export default function ProjectDetail() {
  const router = useRouter();
  const { id } = router.query;
  const projectStore = useProjectStore();
  const project = projectStore.projects.find(p => p.projectId === id);
  const [newTask, setNewTask] = useState({ title: '', description: '' });

  const [filters, setFilters] = useState({ status: '', priority: '', query: '' });

  if (!project) return <div>Loading...</div>;

  const handleAddTask = () => {
    projectStore.addTask(id, { ...newTask, status: 'To Do', priority: 'Low' });
    setNewTask({ title: '', description: '' });
  };

  const filteredTasks = projectStore.filterTasks(id, filters);

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl mb-4">{project.title}</h1>
        <p className="mb-4">{project.description}</p>

        <div className="mb-4">
          <input type="text" placeholder="Task Title" value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            className="border p-2 mb-2 w-full" />
          <textarea placeholder="Task Description" value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            className="border p-2 mb-2 w-full" />
          <button onClick={handleAddTask} className="bg-blue-500 text-white p-2 w-full">Add Task</button>
        </div>

        <div className="mb-4">
          <input type="text" placeholder="Search" value={filters.query}
            onChange={(e) => setFilters({ ...filters, query: e.target.value })}
            className="border p-2 mb-2 w-full" />
          <select value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="border p-2 mb-2 w-full">
            <option value="">All Statuses</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
          <select value={filters.priority} onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
            className="border p-2 mb-2 w-full">
            <option value="">All Priorities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <h2 className="text-xl mb-2">Tasks</h2>
        <ul>
          {filteredTasks.map((task) => (
            <li key={task.taskId} className="border p-2 mb-2">
              <div>{task.title}</div>
              <div>{task.description}</div>
              <div>Status: {task.status}</div>
              <div>Priority: {task.priority}</div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}