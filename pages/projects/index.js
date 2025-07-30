import Navbar from '../../components/Navbar';
import { useProjectStore } from '../../store/projectStore';
import Link from 'next/link';
import ProjectList from '../../components/ProjectList';

const ProjectsIndex = (() => {
  const projectStore = useProjectStore();
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-semibold text-gray-900">Projects</h1>
        <div className="flex justify-between items-center">
          <Link href="/projects/new" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            New Project
          </Link>
          <div className="text-lg font-medium text-gray-700">{projectStore.projects.length} Projects</div>
        </div>
        <ProjectList />
      </div>
    </>
  );
});

export default ProjectsIndex;