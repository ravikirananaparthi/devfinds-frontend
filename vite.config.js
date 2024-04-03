import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Specify the port you want to use
    // host: '0.0.0.0', // Uncomment this line if you want to listen on all network interfaces
  },
})
