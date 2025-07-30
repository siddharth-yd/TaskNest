import Navbar from '../../components/Navbar';
import Link from 'next/link';
import ProjectList from '../../components/ProjectList';

const ProjectsIndex = () => (
  <>
    <Navbar />
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Projects</h1>
      <Link href="/projects/new" className="bg-blue-500 text-white p-2 mb-4 inline-block">
        New Project
      </Link>
      <ProjectList />
    </div>
  </>
);

export default ProjectsIndex;