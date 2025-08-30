import { v4 as uuidv4 } from "uuid";
import { readDB, writeDB } from "../../../lib/db";

export default function handler(req, res) {
  const { email } = req.query;
  const { method } = req;
  const db = readDB();

  if (!email) return res.status(400).json({ status: "error", message: "Email required" });
  if (!db.projects[email]) db.projects[email] = [];

  switch (method) {
    case "GET":
      return res.status(200).json({ status: "success", data: db.projects[email] });

    case "POST": {
      let body = req.body;
      if (typeof body === "string") body = JSON.parse(body);
      const { title, description } = body;

      const newProject = {
        projectId: uuidv4(),
        title,
        description,
        createdAt: new Date().toISOString(),
        users: [email],
        tasks: []
      };
      db.projects[email].push(newProject);
      writeDB(db);
      return res.status(201).json({ status: "success", data: newProject });
    }

    default:
      return res.status(405).json({ status: "error", message: "Method not allowed" });
  }
}