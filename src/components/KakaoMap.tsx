import { useEffect, useRef, useState } from 'react'
import { zones } from '../data/zones'
import type { Zone } from '../data/zones'
import DetailSheet from './DetailSheet'

declare global {
  interface Window {
    kakao: any
  }
}

const PIN_COLORS: Record<Zone['pin_type'], string> = {
  blue: '#2E6FD4',
  orange: '#D4622E',
  star: '#C07A2E',
}

export default function KakaoMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [selected, setSelected] = useState<Zone | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)

  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      initMap()
    } else {
      const wait = setInterval(() => {
        if (window.kakao && window.kakao.maps) {
          clearInterval(wait)
          initMap()
        }
      }, 100)
      return () => clearInterval(wait)
    }
  }, [])

  function initMap() {
    if (!mapRef.current) return

    const map = new window.kakao.maps.Map(mapRef.current, {
      center: new window.kakao.maps.LatLng(37.5174, 127.0474),
      level: 7,
    })

    zones.forEach(zone => {
      const color = PIN_COLORS[zone.pin_type]

      const svgContent = `
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="36" viewBox="0 0 28 36">
          <path d="M14 0C6.27 0 0 6.27 0 14c0 10.5 14 22 14 22S28 24.5 28 14C28 6.27 21.73 0 14 0z" fill="${color}"/>
          ${zone.pin_type === 'star'
            ? `<text x="14" y="19" text-anchor="middle" fill="white" font-size="14">★</text>`
            : `<circle cx="14" cy="14" r="5" fill="white"/>`
          }
        </svg>
      `

      const markerImage = new window.kakao.maps.MarkerImage(
        `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgContent)}`,
        new window.kakao.maps.Size(28, 36),
        { offset: new window.kakao.maps.Point(14, 36) }
      )

      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(zone.lat, zone.lng),
        map,
        image: markerImage,
        title: zone.name,
      })

      window.kakao.maps.event.addListener(marker, 'click', () => {
        setSelected(zone)
      })
    })

    setMapLoaded(true)
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div ref={mapRef} style={{ width: '100%', height: '100%' }} />

      {!mapLoaded && (
        <div style={{
          position: 'absolute', inset: 0, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          background: '#FAF7F2', flexDirection: 'column', gap: 12,
        }}>
          <div style={{ fontSize: 32 }}>🗺️</div>
          <p style={{ color: '#888780', fontSize: 14 }}>지도 불러오는 중...</p>
        </div>
      )}

      <div style={{
        position: 'absolute', top: 12, left: 12, right: 12,
        background: '#FAF7F2', borderRadius: 12,
        padding: '10px 14px', boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
        display: 'flex', alignItems: 'center', gap: 8,
        border: '1px solid #C4A882',
      }}>
        <span style={{ fontSize: 16 }}>🔍</span>
        <span style={{ color: '#888780', fontSize: 14, flex: 1 }}>근처 흡연구역 찾기</span>
      </div>

      <div style={{
        position: 'absolute', bottom: 16, left: 12,
        background: '#FAF7F2', borderRadius: 10,
        padding: '8px 12px', boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
        border: '1px solid #C4A882', display: 'flex', flexDirection: 'column', gap: 6,
      }}>
        {[
          { color: '#2E6FD4', label: '최근 인증' },
          { color: '#D4622E', label: '30일 초과' },
          { color: '#C07A2E', label: '우수시설 ★' },
        ].map(item => (
          <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{
              width: 10, height: 10, borderRadius: '50%',
              background: item.color, flexShrink: 0,
            }} />
            <span style={{ fontSize: 11, color: '#5C3D2E' }}>{item.label}</span>
          </div>
        ))}
      </div>

      <DetailSheet zone={selected} onClose={() => setSelected(null)} />
    </div>
  )
}
