import { v4 as uuidv4 } from 'uuid';

let projects = [];

export default function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      res.status(200).json(projects);
      break;
    case 'POST':
      const { title, description, email } = req.body;
      const newProject = { projectId: uuidv4(), title, description, users: [email], createdAt: new Date(), tasks: [] };
      projects.push(newProject);
      res.status(201).json(newProject);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}