/*
 * @Author: linglingling
 */
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default ({ mode }) => {

  // 获取env配置文件的配置
  const env = loadEnv(mode, process.cwd());
  console.log('env: ', env)
 
  return defineConfig({
    server: {
      // 配置可通过ip地址访问
      host: '0.0.0.0',
      port: 8008,
      strictPort: true,
      cors: true,
      proxy: {
        '/service': {
          target: env.VITE_SERVER_URL,
          changeOrigin: true
          // rewrite: (path) => path.replace(/^\/service/, '/service')
        },
      } 
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/assets/scss/variable.scss";`
        }
      }
    },
    pluginOptions: {
      'style-resources-loader': {
        preProcessor: 'sass',
        patterns: []
      }
    },
    plugins: [
        vue(),

    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        'views': path.resolve(__dirname, 'src/views'),
        'apis': path.resolve(__dirname, 'src/api'),
      }
    },
    build: {

    }
  })
}
