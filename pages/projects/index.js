import { useEffect } from "react";
import Navbar from '../../components/Navbar';
import { useProjectStore } from '../../store/projectStore';
import { useUserStore } from '../../store/userStore';
import Link from 'next/link';
import ProjectList from '../../components/ProjectList';
import { observer } from "mobx-react-lite";

const ProjectsIndex = observer(() => {
  const projectStore = useProjectStore();
  const userStore = useUserStore();

  useEffect(() => {
    if (userStore.email) projectStore.fetchProjects(userStore.email);
  }, [userStore.email]);

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-semibold text-gray-900">Projects</h1>
        <div className="flex justify-between items-center">
          <Link href="/projects/new" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            New Project
          </Link>
          <div className="text-lg font-medium text-gray-700">
            {projectStore.projects.length} Projects
          </div>
        </div>
        <ProjectList />
      </div>
    </>
  );
});

export default ProjectsIndex;