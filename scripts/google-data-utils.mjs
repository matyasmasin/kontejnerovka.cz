import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

export const PRIVATE_DATA_DIR =
  process.env.KONTEJNEROVKA_PRIVATE_DATA_DIR ||
  "/Users/claude/Documents/Claude/kontejnerovka-private-growth/data";

const dateToIso = (date) => date.toISOString().slice(0, 10);

export function getCompleteDateRange(days = 28) {
  const end = new Date();
  end.setDate(end.getDate() - 1);
  const start = new Date(end);
  start.setDate(start.getDate() - days + 1);
  return { startDate: dateToIso(start), endDate: dateToIso(end), days };
}

export function getPreviousDateRange(days = 28) {
  const current = getCompleteDateRange(days);
  const end = new Date(`${current.startDate}T00:00:00.000Z`);
  end.setDate(end.getDate() - 1);
  const start = new Date(end);
  start.setDate(start.getDate() - days + 1);
  return { startDate: dateToIso(start), endDate: dateToIso(end), days };
}

export async function ensureOutputDir(...segments) {
  const dir = path.join(PRIVATE_DATA_DIR, ...segments);
  await mkdir(dir, { recursive: true });
  return dir;
}

const escapeCsv = (value) => {
  const text = String(value ?? "");
  if (/[",\n]/.test(text)) return `"${text.replace(/"/g, '""')}"`;
  return text;
};

export async function writeCsv(filePath, headers, rows) {
  const lines = [headers.join(",")];
  for (const row of rows) {
    lines.push(headers.map((header) => escapeCsv(row[header])).join(","));
  }
  await writeFile(filePath, `${lines.join("\n")}\n`, "utf8");
}

export async function writeMarkdown(filePath, content) {
  await writeFile(filePath, `${content.trim()}\n`, "utf8");
}

export const sum = (rows, field) => rows.reduce((total, row) => total + Number(row[field] || 0), 0);
