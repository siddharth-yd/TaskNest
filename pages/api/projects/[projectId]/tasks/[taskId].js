import { readDB, writeDB } from "../../../../../lib/db";

export default function handler(req, res) {
  const { projectId, taskId, email } = req.query;
  const { method } = req;
  const db = readDB();

  if (!email) return res.status(400).json({ status: "error", message: "Email required" });
  if (!db.projects[email]) db.projects[email] = [];

  const project = db.projects[email].find(p => p.projectId === projectId);
  if (!project) return res.status(404).json({ status: "error", message: "Project not found" });

  const idx = project.tasks.findIndex(t => t.taskId === taskId);
  if (idx === -1) return res.status(404).json({ status: "error", message: "Task not found" });

  switch (method) {
    case "PUT": {
      let updates = req.body;
      if (typeof updates === "string") updates = JSON.parse(updates);

      project.tasks[idx] = { ...project.tasks[idx], ...updates };
      writeDB(db);
      return res.json({ status: "success", data: project.tasks[idx] });
    }

    case "DELETE":
      project.tasks.splice(idx, 1);
      writeDB(db);
      return res.json({ status: "success", message: "Task deleted" });

    default:
      return res.status(405).json({ status: "error", message: "Method not allowed" });
  }
}