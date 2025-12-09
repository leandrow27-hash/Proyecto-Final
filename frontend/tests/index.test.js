import fs from 'fs'
import path from 'path'

test('index.html exists and has #root', () => {
  const indexPath = path.resolve(__dirname, '..', 'public', 'index.html')
  expect(fs.existsSync(indexPath)).toBe(true)
  const content = fs.readFileSync(indexPath, 'utf8')
  expect(content).toMatch(/id=["']root["']/)
})
