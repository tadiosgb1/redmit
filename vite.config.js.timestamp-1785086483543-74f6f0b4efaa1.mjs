// vite.config.js
import { defineConfig } from "file:///C:/Users/hp/Documents/Peace%20Movement/front-end/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/hp/Documents/Peace%20Movement/front-end/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import path from "path";
import commonjs from "file:///C:/Users/hp/Documents/Peace%20Movement/front-end/node_modules/vite-plugin-commonjs/dist/index.mjs";
var __vite_injected_original_dirname = "C:\\Users\\hp\\Documents\\Peace Movement\\front-end";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    commonjs()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "src")
    }
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    allowedHosts: "all"
  },
  preview: {
    host: "0.0.0.0",
    port: 5173
  },
  optimizeDeps: {
    include: ["rtcpeerconnection-shim", "sdp"]
  },
  assetsInclude: ["**/*.PNG", "**/*.JPG", "**/*.jpeg", "**/*.gif", "**/*.svg"]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxocFxcXFxEb2N1bWVudHNcXFxcUGVhY2UgTW92ZW1lbnRcXFxcZnJvbnQtZW5kXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxocFxcXFxEb2N1bWVudHNcXFxcUGVhY2UgTW92ZW1lbnRcXFxcZnJvbnQtZW5kXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9ocC9Eb2N1bWVudHMvUGVhY2UlMjBNb3ZlbWVudC9mcm9udC1lbmQvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcclxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcclxuaW1wb3J0IGNvbW1vbmpzIGZyb20gJ3ZpdGUtcGx1Z2luLWNvbW1vbmpzJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBwbHVnaW5zOiBbXHJcbiAgICB2dWUoKSxcclxuICAgIGNvbW1vbmpzKClcclxuICBdLFxyXG5cclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczoge1xyXG4gICAgICAnQCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnKVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIHNlcnZlcjoge1xyXG4gICAgaG9zdDogJzAuMC4wLjAnLFxyXG4gICAgcG9ydDogNTE3MyxcclxuICAgIGFsbG93ZWRIb3N0czogJ2FsbCdcclxuICB9LFxyXG5cclxuICBwcmV2aWV3OiB7XHJcbiAgICBob3N0OiAnMC4wLjAuMCcsXHJcbiAgICBwb3J0OiA1MTczXHJcbiAgfSxcclxuXHJcbiAgb3B0aW1pemVEZXBzOiB7XHJcbiAgICBpbmNsdWRlOiBbJ3J0Y3BlZXJjb25uZWN0aW9uLXNoaW0nLCAnc2RwJ11cclxuICB9LFxyXG5cclxuICBhc3NldHNJbmNsdWRlOiBbJyoqLyouUE5HJywgJyoqLyouSlBHJywgJyoqLyouanBlZycsICcqKi8qLmdpZicsICcqKi8qLnN2ZyddXHJcbn0pXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBMFUsU0FBUyxvQkFBb0I7QUFDdlcsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sVUFBVTtBQUNqQixPQUFPLGNBQWM7QUFIckIsSUFBTSxtQ0FBbUM7QUFLekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBLElBQ0osU0FBUztBQUFBLEVBQ1g7QUFBQSxFQUVBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLEtBQUs7QUFBQSxJQUNwQztBQUFBLEVBQ0Y7QUFBQSxFQUVBLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLGNBQWM7QUFBQSxFQUNoQjtBQUFBLEVBRUEsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUVBLGNBQWM7QUFBQSxJQUNaLFNBQVMsQ0FBQywwQkFBMEIsS0FBSztBQUFBLEVBQzNDO0FBQUEsRUFFQSxlQUFlLENBQUMsWUFBWSxZQUFZLGFBQWEsWUFBWSxVQUFVO0FBQzdFLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
