import type { Zone } from '../data/zones'

interface Props {
  zone: Zone | null
  onClose: () => void
}

const PIN_LABELS: Record<Zone['pin_type'], { label: string; color: string; bg: string }> = {
  blue: { label: '최근 인증', color: '#185FA5', bg: '#E6F1FB' },
  orange: { label: '30일 초과', color: '#993C1D', bg: '#FAECE7' },
  star: { label: '우수시설', color: '#854F0B', bg: '#FAEEDA' },
}

export default function DetailSheet({ zone, onClose }: Props) {
  if (!zone) return null

  const pin = PIN_LABELS[zone.pin_type]

  const daysSince = () => {
    const diff = Date.now() - new Date(zone.last_verified).getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    if (days === 0) return '오늘'
    if (days === 1) return '1일 전'
    return `${days}일 전`
  }

  const openKakaoNav = () => {
    const url = `https://map.kakao.com/link/to/${encodeURIComponent(zone.name)},${zone.lat},${zone.lng}`
    window.open(url, '_blank')
  }

  const openNearbyStore = () => {
    if (!zone.nearby_store) return
    const url = `https://map.kakao.com/link/search/${encodeURIComponent(zone.nearby_store)}`
    window.open(url, '_blank')
  }

  return (
    <>
      <div
        style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 100,
        }}
        onClick={onClose}
      />
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        background: '#FAF7F2', borderRadius: '20px 20px 0 0',
        padding: '20px 20px 36px', zIndex: 101,
        boxShadow: '0 -4px 24px rgba(0,0,0,0.12)',
        maxWidth: 480, margin: '0 auto',
      }}>
        <div style={{
          width: 40, height: 4, background: '#C4A882',
          borderRadius: 2, margin: '0 auto 16px',
        }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#3B2A1A', flex: 1, marginRight: 12, lineHeight: 1.4 }}>
            {zone.name}
          </h2>
          <button onClick={onClose} style={{
            background: 'none', border: 'none', fontSize: 20, cursor: 'pointer',
            color: '#888780', padding: '0 4px', lineHeight: 1,
          }}>×</button>
        </div>

        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
          <span style={{
            background: pin.bg, color: pin.color,
            borderRadius: 6, padding: '3px 8px', fontSize: 12, fontWeight: 500,
          }}>{pin.label}</span>
          {zone.facilities.map(f => (
            <span key={f} style={{
              background: '#F5F0EB', color: '#5C3D2E',
              borderRadius: 6, padding: '3px 8px', fontSize: 12,
            }}>{f}</span>
          ))}
        </div>

        <p style={{ fontSize: 13, color: '#888780', marginBottom: 4 }}>{zone.address}</p>
        <p style={{ fontSize: 12, color: '#888780', marginBottom: 14 }}>
          마지막 인증: {daysSince()} · 누적 인증 {zone.verify_count}회
        </p>

        {zone.nearby_store && (
          <button onClick={openNearbyStore} style={{
            width: '100%', background: '#F5F0EB', border: 'none',
            borderRadius: 10, padding: '10px 14px', marginBottom: 10,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            cursor: 'pointer', fontSize: 13, color: '#5C3D2E',
          }}>
            <span>근처 편의점: {zone.nearby_store}</span>
            <span style={{ color: '#C07A2E', fontWeight: 700 }}>→</span>
          </button>
        )}

        <button onClick={openKakaoNav} style={{
          width: '100%', background: '#C07A2E', border: 'none',
          borderRadius: 12, padding: '14px', color: '#fff',
          fontSize: 15, fontWeight: 700, cursor: 'pointer',
        }}>
          카카오맵으로 길찾기
        </button>
      </div>
    </>
  )
}
