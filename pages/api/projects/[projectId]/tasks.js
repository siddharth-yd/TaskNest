import { v4 as uuidv4 } from "uuid";
import { readDB, writeDB } from "../../../../lib/db";

export default function handler(req, res) {
  const { projectId, email } = req.query;
  const { method } = req;
  const db = readDB();

  if (!email) return res.status(400).json({ status: "error", message: "Email required" });
  if (!db.projects[email]) db.projects[email] = [];

  const project = db.projects[email].find(p => p.projectId === projectId);
  if (!project) return res.status(404).json({ status: "error", message: "Project not found" });

  switch (method) {
    case "GET":
      return res.json({ status: "success", data: project.tasks });

    case "POST": {
      let body = req.body;
      if (typeof body === "string") body = JSON.parse(body);
      const { title, description, status, priority, tags, dueDate } = body;

      const newTask = {
        taskId: uuidv4(),
        projectId,
        title,
        description,
        status: status || "To Do",
        priority: priority || "Low",
        tags: tags || [],
        dueDate: dueDate || null
      };

      project.tasks.push(newTask);
      writeDB(db);
      return res.status(201).json({ status: "success", data: newTask });
    }

    default:
      return res.status(405).json({ status: "error", message: "Method not allowed" });
  }
}