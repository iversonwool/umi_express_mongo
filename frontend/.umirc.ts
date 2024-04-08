import { defineConfig } from "@umijs/max";

export default defineConfig({
  routes: [
    { path: "/", component: "index", layout: false },
    { path: "/docs", component: "docs" },
  ],
  npmClient: 'pnpm',
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:3000',
      pathRewrite: (path) => path.replace('/api', '') 
    }
  },
  request: {}
});
