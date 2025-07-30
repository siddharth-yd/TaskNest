export default function handler(req, res) {
  const { method, query: { projectId } } = req;

  switch (method) {
    case 'GET':
      const project = projects.find(p => p.projectId === projectId);
      project ? res.status(200).json(project) : res.status(404).end('Project not found');
      break;
    case 'PUT':
      const index = projects.findIndex(p => p.projectId === projectId);
      if (index !== -1) {
        projects[index] = { ...projects[index], ...req.body };
        res.status(200).json(projects[index]);
      } else {
        res.status(404).end('Project not found');
      }
      break;
    case 'DELETE':
      projects = projects.filter(p => p.projectId !== projectId);
      res.status(204).end();
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}