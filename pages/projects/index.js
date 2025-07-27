import Navbar from '../../components/Navbar';
import { useProjectStore } from '../../store/projectStore';
import Link from 'next/link';

export default function Projects() {
  const projectStore = useProjectStore();

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl mb-4">Projects</h1>
        <Link href="/projects/new" className="bg-blue-500 text-white p-2 mb-4 inline-block">
          New Project
        </Link>
        <ul>
          {projectStore.projects.map(project => (
            <li key={project.projectId} className="border p-2 mb-2">
              <Link href={`/projects/${project.projectId}`}>
                {project.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}