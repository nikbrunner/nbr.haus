import { spawn, type ChildProcess } from "child_process";
import fs from "fs";
import os from "os";
import path from "path";
import { fileURLToPath } from "url";

import { chromium } from "playwright";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const COVER_LETTERS_DIR = path.join(
  os.homedir(),
  "repos/nikbrunner/notes/01 - Projects/New Job 2026/Coverletters"
);
const DEV_SERVER_URL = "http://localhost:3000";

interface CoverLetterConfig {
  slug: string;
  sourcePath: string;
  pdfPath: string;
}

function discoverCoverLetters(): CoverLetterConfig[] {
  if (!fs.existsSync(COVER_LETTERS_DIR)) {
    console.log(`Cover letters directory not found: ${COVER_LETTERS_DIR}`);
    return [];
  }

  const files = fs.readdirSync(COVER_LETTERS_DIR);
  const mdFiles = files.filter(f => f.endsWith(".md"));

  return mdFiles.map(filename => {
    const slug = filename.replace(".md", "");
    const sourcePath = path.join(COVER_LETTERS_DIR, filename);
    const pdfPath = path.join(COVER_LETTERS_DIR, `${slug}.pdf`);

    return { slug, sourcePath, pdfPath };
  });
}

async function waitForServer(url: string, maxAttempts = 30): Promise<void> {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // Server not ready yet
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  throw new Error(`Server at ${url} did not start in time`);
}

async function startDevServer(): Promise<ChildProcess> {
  console.log("Starting dev server...");
  const server = spawn("npm", ["run", "dev"], {
    cwd: path.resolve(__dirname, ".."),
    stdio: ["ignore", "pipe", "pipe"],
    shell: true
  });

  server.stdout?.on("data", data => {
    if (process.env.VERBOSE) console.log(`[server]: ${data}`);
  });

  server.stderr?.on("data", data => {
    if (process.env.VERBOSE) console.error(`[server error]: ${data}`);
  });

  await waitForServer(DEV_SERVER_URL);
  console.log("Dev server ready");
  return server;
}

async function generatePDF(config: CoverLetterConfig): Promise<void> {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const url = `${DEV_SERVER_URL}/cover/${config.slug}`;
  console.log(`Generating ${path.basename(config.pdfPath)} from ${url}`);

  await page.goto(url, { waitUntil: "networkidle" });

  // Wait for fonts and images to load
  await page.waitForLoadState("load");
  await page.waitForTimeout(1000); // Extra time for web fonts

  await page.pdf({
    path: config.pdfPath,
    format: "A4",
    margin: {
      top: "1.5cm",
      right: "1.5cm",
      bottom: "1.5cm",
      left: "1.5cm"
    },
    printBackground: false,
    preferCSSPageSize: true
  });

  console.log(`Generated: ${config.pdfPath}`);
  await browser.close();
}

async function main(): Promise<void> {
  const configs = discoverCoverLetters();

  if (configs.length === 0) {
    console.log("No cover letters found to generate.");
    return;
  }

  console.log(`Found ${configs.length} cover letter(s):`);
  configs.forEach(c => console.log(`  - ${c.slug}`));
  console.log();

  let server: ChildProcess | null = null;

  try {
    // Check if server is already running
    try {
      const response = await fetch(DEV_SERVER_URL);
      if (response.ok) {
        console.log("Dev server already running");
      }
    } catch {
      server = await startDevServer();
    }

    // Generate PDFs sequentially to avoid resource contention
    for (const config of configs) {
      await generatePDF(config);
    }

    console.log("\nAll PDFs generated successfully!");
  } finally {
    if (server) {
      console.log("Stopping dev server...");
      server.kill();
    }
  }
}

main().catch(error => {
  console.error("PDF generation failed:", error);
  process.exit(1);
});
