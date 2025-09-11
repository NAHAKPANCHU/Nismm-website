import react from "@vitejs/plugin-react-swc";
import { componentTagger } from "lovable-tagger";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
 server: {
  allowedHosts: ["d5795509211f.ngrok-free.app"],
  proxy: {
   "/api": {
    target: "http://localhost:8000",
    changeOrigin: true,
   },
  },
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
