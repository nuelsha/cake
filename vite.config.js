import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import gltf from 'vite-plugin-gltf'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), gltf()],
})
