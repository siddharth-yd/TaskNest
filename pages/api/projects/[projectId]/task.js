export default function handler(req, res) {
  const { method, query: { projectId } } = req;

  switch (method) {
    case 'GET':
      const project = projects.find(p => p.projectId === projectId);
      project ? res.status(200).json(project.tasks || []) : res.status(404).end('Project not found');
      break;
    case 'POST':
      const task = { ...req.body, taskId: uuidv4() };
      const projectIndex = projects.findIndex(p => p.projectId === projectId);
      if (projectIndex !== -1) {
        projects[projectIndex].tasks.push(task);
        res.status(201).json(task);
      } else {
        res.status(404).end('Project not found');
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}