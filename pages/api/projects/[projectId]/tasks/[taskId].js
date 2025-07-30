export default function handler(req, res) {
  const { method, query: { projectId, taskId } } = req;

  switch (method) {
    case 'PUT':
      const project = projects.find(p => p.projectId === projectId);
      if (!project) return res.status(404).end('Project not found');
      
      const taskIndex = project.tasks.findIndex(t => t.taskId === taskId);
      if (taskIndex !== -1) {
        project.tasks[taskIndex] = { ...project.tasks[taskIndex], ...req.body };
        res.status(200).json(project.tasks[taskIndex]);
      } else {
        res.status(404).end('Task not found');
      }
      break;
    case 'DELETE':
      const projectIndex = projects.findIndex(p => p.projectId === projectId);
      if (projectIndex !== -1) {
        projects[projectIndex].tasks = projects[projectIndex].tasks.filter(t => t.taskId !== taskId);
        res.status(204).end();
      } else {
        res.status(404).end('Project not found');
      }
      break;
    default:
      res.setHeader('Allow', ['PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}