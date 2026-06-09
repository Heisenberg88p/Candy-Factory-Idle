import React from 'react'
import './App.css'

const stats = [
  { label: 'Money', value: '$0' },
  { label: 'Products', value: '0' },
  { label: 'Income/sec', value: '$0' },
]

const stations = [
  {
    name: 'Mixer',
    status: 'Unlocked / Active',
    description: 'Blends sugar, syrup, and color into the first candy batch.',
    active: true,
  },
  {
    name: 'Candy Shaper',
    status: 'Locked',
    cost: '$50',
    description: 'Shapes mixed candy into bright bite-sized sweets.',
  },
  {
    name: 'Packaging Machine',
    status: 'Locked',
    cost: '$180',
    description: 'Wraps finished candy for a clean factory shipment.',
  },
]

const upgrades = [
  {
    name: 'Faster Machines',
    effect: 'Placeholder: improves machine speed in a later build.',
    cost: '$25',
  },
  {
    name: 'Better Candy Recipe',
    effect: 'Placeholder: increases candy value in a later build.',
    cost: '$40',
  },
  {
    name: 'Auto Production',
    effect: 'Placeholder: unlocks hands-free candy making later.',
    cost: '$120',
  },
  {
    name: 'Conveyor Boost',
    effect: 'Placeholder: improves factory flow in a later build.',
    cost: '$200',
  },
]

function App() {
  return (
    <main className="app-shell" aria-label="Candy Factory Idle main screen">
      <section className="phone-frame">
        <header className="hero-card">
          <div>
            <p className="eyebrow">Tiny Factory Build 01</p>
            <h1>Candy Factory Idle</h1>
            <p className="subtitle">Build your tiny candy factory</p>
          </div>

          <div className="stats-grid" aria-label="Factory stats">
            {stats.map((stat) => (
              <div className="stat-pill" key={stat.label}>
                <span>{stat.label}</span>
                <strong>{stat.value}</strong>
              </div>
            ))}
          </div>
        </header>

        <section className="machine-card" aria-labelledby="production-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Production</p>
              <h2 id="production-title">Mixer Station</h2>
            </div>
            <span className="status-badge">Active</span>
          </div>

          <div className="factory-scene" aria-hidden="true">
            <div className="pipe pipe-left" />
            <div className="pipe pipe-right" />
            <div className="machine-top">MIXER</div>
            <div className="mixing-bowl">
              <span className="candy-dot pink" />
              <span className="candy-dot mint" />
              <span className="candy-dot yellow" />
            </div>
            <div className="machine-base" />
          </div>

          <div className="progress-wrap">
            <div className="progress-label">
              <span>Batch progress</span>
              <span>0%</span>
            </div>
            <div className="progress-track">
              <div className="progress-fill" />
            </div>
          </div>

          <button className="make-button" type="button">Make Candy</button>
        </section>

        <section className="content-section" aria-labelledby="stations-title">
          <div className="section-heading compact">
            <div>
              <p className="eyebrow">Factory Line</p>
              <h2 id="stations-title">Station Cards</h2>
            </div>
          </div>

          <div className="station-list">
            {stations.map((station) => (
              <article className={`station-card ${station.active ? 'active' : 'locked'}`} key={station.name}>
                <div>
                  <h3>{station.name}</h3>
                  <p>{station.description}</p>
                </div>
                <div className="card-meta">
                  <span>{station.status}</span>
                  {station.cost && <strong>Unlock Cost: {station.cost}</strong>}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section" aria-labelledby="upgrades-title">
          <div className="section-heading compact">
            <div>
              <p className="eyebrow">Workshop</p>
              <h2 id="upgrades-title">Upgrades</h2>
            </div>
          </div>

          <div className="upgrade-grid">
            {upgrades.map((upgrade) => (
              <article className="upgrade-card" key={upgrade.name}>
                <div>
                  <h3>{upgrade.name}</h3>
                  <p>{upgrade.effect}</p>
                </div>
                <div className="upgrade-details">
                  <span>Level: 0</span>
                  <strong>Cost: {upgrade.cost}</strong>
                </div>
                <button className="buy-button" type="button">Buy</button>
              </article>
            ))}
          </div>
        </section>

        <footer className="progress-hint">
          <span>Factory completion: 0%</span>
          <p>Next: produce candies, earn money, unlock machines.</p>
        </footer>
      </section>
    </main>
  )
}

export default App
