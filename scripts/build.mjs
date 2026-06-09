import { access, mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { spawn } from 'node:child_process'

const distDir = new URL('../dist/', import.meta.url)
const viteBin = new URL('../node_modules/.bin/vite', import.meta.url)

if (await fileExists(viteBin)) {
  await runViteBuild(viteBin)
  process.exit(0)
}

console.log('Vite executable not available; using dependency-free fallback build.')

const css = `
${await readSourceFile('../src/index.css')}
${await readSourceFile('../src/App.css')}
`

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Candy Factory Idle</title>
    <style>${css}</style>
  </head>
  <body>
    <div id="root">
      <main class="app-shell" aria-label="Candy Factory Idle main screen">
        <section class="phone-frame">
          <header class="hero-card">
            <div>
              <p class="eyebrow">Tiny Factory Build 01</p>
              <h1>Candy Factory Idle</h1>
              <p class="subtitle">Build your tiny candy factory</p>
            </div>
            <div class="stats-grid" aria-label="Factory stats">
              <div class="stat-pill"><span>Money</span><strong>$0</strong></div>
              <div class="stat-pill"><span>Products</span><strong>0</strong></div>
              <div class="stat-pill"><span>Income/sec</span><strong>$0</strong></div>
            </div>
          </header>

          <section class="machine-card" aria-labelledby="production-title">
            <div class="section-heading">
              <div>
                <p class="eyebrow">Production</p>
                <h2 id="production-title">Mixer Station</h2>
              </div>
              <span class="status-badge">Active</span>
            </div>
            <div class="factory-scene" aria-hidden="true">
              <div class="pipe pipe-left"></div>
              <div class="pipe pipe-right"></div>
              <div class="machine-top">MIXER</div>
              <div class="mixing-bowl">
                <span class="candy-dot pink"></span>
                <span class="candy-dot mint"></span>
                <span class="candy-dot yellow"></span>
              </div>
              <div class="machine-base"></div>
            </div>
            <div class="progress-wrap">
              <div class="progress-label"><span>Batch progress</span><span>0%</span></div>
              <div class="progress-track"><div class="progress-fill"></div></div>
            </div>
            <button class="make-button" type="button">Make Candy</button>
          </section>

          <section class="content-section" aria-labelledby="stations-title">
            <div class="section-heading compact">
              <div><p class="eyebrow">Factory Line</p><h2 id="stations-title">Station Cards</h2></div>
            </div>
            <div class="station-list">
              <article class="station-card active">
                <div><h3>Mixer</h3><p>Blends sugar, syrup, and color into the first candy batch.</p></div>
                <div class="card-meta"><span>Unlocked / Active</span></div>
              </article>
              <article class="station-card locked">
                <div><h3>Candy Shaper</h3><p>Shapes mixed candy into bright bite-sized sweets.</p></div>
                <div class="card-meta"><span>Locked</span><strong>Unlock Cost: $50</strong></div>
              </article>
              <article class="station-card locked">
                <div><h3>Packaging Machine</h3><p>Wraps finished candy for a clean factory shipment.</p></div>
                <div class="card-meta"><span>Locked</span><strong>Unlock Cost: $180</strong></div>
              </article>
            </div>
          </section>

          <section class="content-section" aria-labelledby="upgrades-title">
            <div class="section-heading compact">
              <div><p class="eyebrow">Workshop</p><h2 id="upgrades-title">Upgrades</h2></div>
            </div>
            <div class="upgrade-grid">
              <article class="upgrade-card"><div><h3>Faster Machines</h3><p>Placeholder: improves machine speed in a later build.</p></div><div class="upgrade-details"><span>Level: 0</span><strong>Cost: $25</strong></div><button class="buy-button" type="button">Buy</button></article>
              <article class="upgrade-card"><div><h3>Better Candy Recipe</h3><p>Placeholder: increases candy value in a later build.</p></div><div class="upgrade-details"><span>Level: 0</span><strong>Cost: $40</strong></div><button class="buy-button" type="button">Buy</button></article>
              <article class="upgrade-card"><div><h3>Auto Production</h3><p>Placeholder: unlocks hands-free candy making later.</p></div><div class="upgrade-details"><span>Level: 0</span><strong>Cost: $120</strong></div><button class="buy-button" type="button">Buy</button></article>
              <article class="upgrade-card"><div><h3>Conveyor Boost</h3><p>Placeholder: improves factory flow in a later build.</p></div><div class="upgrade-details"><span>Level: 0</span><strong>Cost: $200</strong></div><button class="buy-button" type="button">Buy</button></article>
            </div>
          </section>

          <footer class="progress-hint"><span>Factory completion: 0%</span><p>Next: produce candies, earn money, unlock machines.</p></footer>
        </section>
      </main>
    </div>
  </body>
</html>`

await rm(distDir, { recursive: true, force: true })
await mkdir(distDir, { recursive: true })
await writeFile(new URL('index.html', distDir), html)
console.log('Built Candy Factory Idle layout to dist/index.html')

function readSourceFile(relativePath) {
  return readFile(new URL(relativePath, import.meta.url), 'utf8')
}

async function fileExists(fileUrl) {
  return access(fileUrl).then(() => true, () => false)
}

function runViteBuild(viteBin) {
  return new Promise((resolve, reject) => {
    const child = spawn(viteBin.pathname, ['build'], { stdio: 'inherit' })
    child.on('error', reject)
    child.on('exit', (code) => {
      if (code === 0) {
        resolve()
        return
      }

      reject(new Error(`Vite build exited with code ${code}`))
    })
  })
}
