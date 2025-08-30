import { readDB, writeDB } from "../../../lib/db";

export default function handler(req, res) {
  const { projectId, email } = req.query;
  const { method } = req;
  const db = readDB();

  if (!email) return res.status(400).json({ status: "error", message: "Email required" });
  if (!db.projects[email]) db.projects[email] = [];

  const idx = db.projects[email].findIndex(p => p.projectId === projectId);
  if (idx === -1) return res.status(404).json({ status: "error", message: "Project not found" });

  switch (method) {
    case "GET":
      return res.json({ status: "success", data: db.projects[email][idx] });

    case "PUT": {
      let updates = req.body;
      if (typeof updates === "string") updates = JSON.parse(updates);
      db.projects[email][idx] = { ...db.projects[email][idx], ...updates };
      writeDB(db);
      return res.json({ status: "success", data: db.projects[email][idx] });
    }

    case "DELETE":
      db.projects[email].splice(idx, 1);
      writeDB(db);
      return res.json({ status: "success", message: "Project deleted" });

    default:
      return res.status(405).json({ status: "error", message: "Method not allowed" });
  }
}