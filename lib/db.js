import fs from "fs";
import path from "path";

const file = path.join(process.cwd(), "data", "db.json");

export function readDB() {
  if (!fs.existsSync(file)) {
    return { projects: {} };
  }
  return JSON.parse(fs.readFileSync(file, "utf-8"));
}

export function writeDB(data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}