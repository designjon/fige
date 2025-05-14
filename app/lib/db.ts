import { promises as fs } from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'db.json');

interface DB {
  soldSpinners: string[];
}

async function initDB() {
  try {
    await fs.access(DB_PATH);
  } catch {
    await fs.writeFile(DB_PATH, JSON.stringify({ soldSpinners: [] }));
  }
}

export async function getSoldSpinners(): Promise<string[]> {
  await initDB();
  const data = await fs.readFile(DB_PATH, 'utf-8');
  return JSON.parse(data).soldSpinners;
}

export async function markSpinnerAsSold(spinnerNumber: string): Promise<void> {
  await initDB();
  const data = await fs.readFile(DB_PATH, 'utf-8');
  const db: DB = JSON.parse(data);
  
  if (!db.soldSpinners.includes(spinnerNumber)) {
    db.soldSpinners.push(spinnerNumber);
    await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2));
  }
}

export async function isSpinnerSold(spinnerNumber: string): Promise<boolean> {
  const soldSpinners = await getSoldSpinners();
  return soldSpinners.includes(spinnerNumber);
} 