import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'
// @ts-ignore
import Critters from 'critters'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'critters-plugin',
      apply: 'build',
      async closeBundle() {
        const indexPath = resolve(__dirname, 'dist/index.html')
        const html = readFileSync(indexPath, 'utf-8')

        const critters = new Critters({
          path: resolve(__dirname, 'dist'),
          publicPath: '/',
          preload: 'swap',
          inlineFonts: false,
        })

        const result = await critters.process(html)
        writeFileSync(indexPath, result)
        console.log('✓ CSS crítico inyectado por critters')
      },
    },
  ],
})