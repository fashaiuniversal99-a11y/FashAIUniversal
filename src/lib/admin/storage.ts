import fs from "fs/promises";
import path from "path";
import { MasterSiteConfig, SubmissionRecord, ActivityLogEntry, VersionHistoryEntry } from "./config-schema";
import { DEFAULT_MASTER_CONFIG } from "./default-config";

const DATA_DIR = path.join(process.cwd(), "data");
const CONFIG_FILE = path.join(DATA_DIR, "admin-config.json");
const DRAFT_CONFIG_FILE = path.join(DATA_DIR, "admin-config-draft.json");
const SUBMISSIONS_FILE = path.join(DATA_DIR, "submissions.json");
const LOGS_FILE = path.join(DATA_DIR, "activity-logs.json");
const HISTORY_FILE = path.join(DATA_DIR, "version-history.json");
const BACKUPS_DIR = path.join(DATA_DIR, "backups");

async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.mkdir(BACKUPS_DIR, { recursive: true });
  } catch (err) {
    console.error("Error creating data dir:", err);
  }
}

export async function getMasterConfig(isDraft = false): Promise<MasterSiteConfig> {
  await ensureDataDir();
  const fileToRead = isDraft ? DRAFT_CONFIG_FILE : CONFIG_FILE;
  try {
    const raw = await fs.readFile(fileToRead, "utf-8");
    return JSON.parse(raw);
  } catch {
    // If draft file requested but doesn't exist, try main config
    if (isDraft) {
      try {
        const rawMain = await fs.readFile(CONFIG_FILE, "utf-8");
        return JSON.parse(rawMain);
      } catch {
        return DEFAULT_MASTER_CONFIG;
      }
    }
    return DEFAULT_MASTER_CONFIG;
  }
}

export async function saveDraftConfig(config: MasterSiteConfig): Promise<MasterSiteConfig> {
  await ensureDataDir();
  const updated = { ...config, lastUpdated: new Date().toISOString(), isDraft: true };
  await fs.writeFile(DRAFT_CONFIG_FILE, JSON.stringify(updated, null, 2), "utf-8");
  return updated;
}

export async function publishConfig(config?: MasterSiteConfig, note = "Published configuration change"): Promise<MasterSiteConfig> {
  await ensureDataDir();
  const targetConfig = config || (await getMasterConfig(true));
  const published = { ...targetConfig, lastUpdated: new Date().toISOString(), isDraft: false };

  // Write to main published config
  await fs.writeFile(CONFIG_FILE, JSON.stringify(published, null, 2), "utf-8");
  // Also sync draft
  await fs.writeFile(DRAFT_CONFIG_FILE, JSON.stringify(published, null, 2), "utf-8");

  // Save to version history
  await addVersionHistory(published, note);
  await addActivityLog("CONTENT", "Published website changes", "System Admin", note);

  return published;
}

export async function getSubmissions(): Promise<SubmissionRecord[]> {
  await ensureDataDir();
  try {
    const raw = await fs.readFile(SUBMISSIONS_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export async function saveSubmission(submission: Omit<SubmissionRecord, "id" | "submittedAt">): Promise<SubmissionRecord> {
  await ensureDataDir();
  const current = await getSubmissions();
  const newRecord: SubmissionRecord = {
    ...submission,
    id: `sub_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    submittedAt: new Date().toISOString(),
    status: "NEW",
  };
  current.unshift(newRecord);
  await fs.writeFile(SUBMISSIONS_FILE, JSON.stringify(current, null, 2), "utf-8");
  return newRecord;
}

export async function updateSubmissionStatus(id: string, status: SubmissionRecord["status"]): Promise<boolean> {
  const current = await getSubmissions();
  const idx = current.findIndex((s) => s.id === id);
  if (idx === -1) return false;
  current[idx].status = status;
  current[idx].updatedAt = new Date().toISOString();
  await fs.writeFile(SUBMISSIONS_FILE, JSON.stringify(current, null, 2), "utf-8");
  return true;
}

export async function addInternalNoteToSubmission(id: string, author: string, note: string): Promise<boolean> {
  const current = await getSubmissions();
  const idx = current.findIndex((s) => s.id === id);
  if (idx === -1) return false;

  const newNote = {
    id: `note_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    author: author || "Admin",
    note,
    timestamp: new Date().toISOString(),
  };

  if (!current[idx].internalNotes) {
    current[idx].internalNotes = [];
  }
  current[idx].internalNotes!.unshift(newNote);
  current[idx].updatedAt = new Date().toISOString();

  await fs.writeFile(SUBMISSIONS_FILE, JSON.stringify(current, null, 2), "utf-8");
  return true;
}

export async function deleteSubmission(id: string): Promise<boolean> {
  const current = await getSubmissions();
  const filtered = current.filter((s) => s.id !== id);
  if (filtered.length === current.length) return false;
  await fs.writeFile(SUBMISSIONS_FILE, JSON.stringify(filtered, null, 2), "utf-8");
  return true;
}

export async function getActivityLogs(): Promise<ActivityLogEntry[]> {
  await ensureDataDir();
  try {
    const raw = await fs.readFile(LOGS_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export async function addActivityLog(
  category: ActivityLogEntry["category"],
  action: string,
  actor = "Admin",
  details = ""
): Promise<ActivityLogEntry> {
  await ensureDataDir();
  const logs = await getActivityLogs();
  const newEntry: ActivityLogEntry = {
    id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    category,
    action,
    actor,
    timestamp: new Date().toISOString(),
    details,
  };
  logs.unshift(newEntry);
  // Keep last 500 logs
  const trimmed = logs.slice(0, 500);
  await fs.writeFile(LOGS_FILE, JSON.stringify(trimmed, null, 2), "utf-8");
  return newEntry;
}

export async function getVersionHistory(): Promise<VersionHistoryEntry[]> {
  await ensureDataDir();
  try {
    const raw = await fs.readFile(HISTORY_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export async function addVersionHistory(config: MasterSiteConfig, note: string): Promise<VersionHistoryEntry> {
  const history = await getVersionHistory();
  const newEntry: VersionHistoryEntry = {
    versionId: `v_${Date.now()}`,
    publishedAt: new Date().toISOString(),
    publishedBy: "Master Admin",
    note,
    configSnapshot: config,
  };
  history.unshift(newEntry);
  const trimmed = history.slice(0, 50);
  await fs.writeFile(HISTORY_FILE, JSON.stringify(trimmed, null, 2), "utf-8");
  return newEntry;
}

export async function listBackups(): Promise<{ filename: string; createdAt: string; size: number }[]> {
  await ensureDataDir();
  try {
    const files = await fs.readdir(BACKUPS_DIR);
    const result = [];
    for (const f of files) {
      if (f.endsWith(".json")) {
        const stat = await fs.stat(path.join(BACKUPS_DIR, f));
        result.push({
          filename: f,
          createdAt: stat.birthtime.toISOString(),
          size: stat.size,
        });
      }
    }
    return result.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  } catch {
    return [];
  }
}

export async function createBackup(name?: string): Promise<string> {
  await ensureDataDir();
  const config = await getMasterConfig(false);
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const filename = name ? `backup_${name}_${timestamp}.json` : `backup_${timestamp}.json`;
  const filePath = path.join(BACKUPS_DIR, filename);
  await fs.writeFile(filePath, JSON.stringify(config, null, 2), "utf-8");
  await addActivityLog("BACKUP", `Created system backup: ${filename}`);
  return filename;
}

export async function restoreBackup(filename: string): Promise<MasterSiteConfig> {
  await ensureDataDir();
  const filePath = path.join(BACKUPS_DIR, filename);
  const raw = await fs.readFile(filePath, "utf-8");
  const restoredConfig: MasterSiteConfig = JSON.parse(raw);
  await publishConfig(restoredConfig, `Restored from backup ${filename}`);
  await addActivityLog("BACKUP", `Restored configuration from backup: ${filename}`);
  return restoredConfig;
}
