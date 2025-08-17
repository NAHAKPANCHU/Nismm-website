import react from "@vitejs/plugin-react-swc";
import { componentTagger } from "lovable-tagger";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
 server: {
  host: "::",
  port: 8080,
  allowedHosts: [
   "0820cd1a6ea2.ngrok-free.app", // <-- your ngrok domain here
  ],
 },
 plugins: [react(), mode === "development" && componentTagger()].filter(
  Boolean
 ),
 resolve: {
  alias: {
   "@": path.resolve(__dirname, "./src"),
  },
 },
}));
