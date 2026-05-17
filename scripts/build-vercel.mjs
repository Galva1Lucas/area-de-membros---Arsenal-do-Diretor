/**
 * Build para Vercel: publica a área de membros (public/app) como site estático.
 */
import { cpSync, mkdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(root, "public", "app");
const out = join(root, "dist-vercel");

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
cpSync(src, out, { recursive: true });

console.log(`Vercel static build OK → ${out}`);
