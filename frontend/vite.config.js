import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

const publicDir = path.resolve(__dirname, 'public')
const publicClipsDir = path.join(publicDir, 'clips')
const srcClipsDir = path.resolve(__dirname, 'clips')

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true })
}
if (!fs.existsSync(publicClipsDir)) {
  fs.mkdirSync(publicClipsDir, { recursive: true })
}

try {
  if (fs.existsSync(srcClipsDir)) {
    const files = fs.readdirSync(srcClipsDir)
    files.forEach(file => {
      const srcFile = path.join(srcClipsDir, file)
      const destFile = path.join(publicClipsDir, file)
      if (fs.statSync(srcFile).isFile()) {
        fs.copyFileSync(srcFile, destFile)
        console.log(`[Vite Config] Copied video clip: ${file}`)
      }
    })
  }
} catch (e) {
  console.error('[Vite Config] Error copying clips:', e)
}

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    fs: {
      allow: [
        'e:/',
        'C:/Users/Hi Sir!!/.gemini/antigravity-ide/brain'
      ]
    }
  }
})
