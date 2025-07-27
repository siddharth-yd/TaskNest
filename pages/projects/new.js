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
      <div className="container mx-auto p-4">
        <h1 className="text-2xl mb-4">New Project</h1>
        <form onSubmit={handleCreate}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Project Title"
            className="border p-2 w-full mb-4"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Project Description"
            className="border p-2 w-full mb-4"
          />
          <button type="submit" className="bg-blue-500 text-white p-2">
            Create Project
          </button>
        </form>
      </div>
    </>
  );
}