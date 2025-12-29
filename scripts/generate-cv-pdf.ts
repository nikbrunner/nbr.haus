import { spawn, type ChildProcess } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

import { chromium } from "playwright";
import { localeSchema, type Locale } from "@/types/i18n";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.resolve(__dirname, "../public");
const DEV_SERVER_URL = "http://localhost:3000";

interface CVConfig {
  lang: Locale;
  filename: `Nikolaus_Brunner_CV_${Locale}.pdf`;
}

const configs: CVConfig[] = localeSchema.options.map(lang => ({
  lang,
  filename: `Nikolaus_Brunner_CV_${lang}.pdf`
}));

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

async function generatePDF(config: CVConfig): Promise<void> {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const url = `${DEV_SERVER_URL}/cv?lang=${config.lang}`;
  console.log(`Generating ${config.filename} from ${url}`);

  await page.goto(url, { waitUntil: "networkidle" });

  // Wait for fonts and images to load
  await page.waitForLoadState("load");
  await page.waitForTimeout(1000); // Extra time for web fonts

  const pdfPath = path.join(PUBLIC_DIR, config.filename);

  await page.pdf({
    path: pdfPath,
    format: "A4",
    // Keep in Sync with sr/routes/cv.css
    margin: {
      top: "1.5cm",
      right: "1.5cm",
      bottom: "1.5cm",
      left: "1.5cm"
    },
    printBackground: false,
    preferCSSPageSize: true
  });

  console.log(`Generated: ${pdfPath}`);
  await browser.close();
}

async function main(): Promise<void> {
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
