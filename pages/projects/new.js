import { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';
import { useProjectStore } from '../../store/projectStore';

export default function NewProject() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const projectStore = useProjectStore();
  const router = useRouter();

  const handleCreate = (e) => {
    e.preventDefault();
    projectStore.addProject({ title, description });
    router.push('/projects');
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-semibold text-gray-900 mb-6">New Project</h1>

        <form onSubmit={handleCreate} className="max-w-lg mx-auto space-y-6 bg-white p-8 shadow-lg rounded-lg">
          <div>
            <label htmlFor="title" className="block text-gray-700 font-medium mb-2">Project Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter the project title"
              className="border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none p-3 w-full rounded-lg shadow-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-gray-700 font-medium mb-2">Project Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter a short description of the project"
              className="border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none p-3 w-full rounded-lg shadow-sm"
              rows="4"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            Create Project
          </button>
        </form>
      </div>

    </>
  );
}