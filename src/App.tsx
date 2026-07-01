import KakaoMap from './components/KakaoMap'

function App() {
  return (
    <div style={{
      width: '100vw', height: '100dvh',
      display: 'flex', flexDirection: 'column',
      background: '#FAF7F2', overflow: 'hidden',
    }}>
      <header style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 16px', height: 52, flexShrink: 0,
        background: '#FAF7F2', borderBottom: '1px solid #E8E0D4',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 20 }}>🚬</span>
          <span style={{ fontSize: 18, fontWeight: 700, color: '#3B2A1A' }}>SmokeHaven</span>
        </div>
        <span style={{ fontSize: 12, color: '#888780' }}>흡연구역 탐색</span>
      </header>

      <main style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <KakaoMap />
      </main>
    </div>
  )
}

export default App
