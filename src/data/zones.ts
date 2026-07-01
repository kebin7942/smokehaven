export interface Zone {
  id: number
  name: string
  address: string
  lat: number
  lng: number
  facilities: string[]
  pin_type: 'blue' | 'orange' | 'star'
  last_verified: string
  verify_count: number
  nearby_store?: string
}

export const zones: Zone[] = [
  {
    id: 1,
    name: '강남역 1번 출구 흡연구역',
    address: '서울 강남구 강남대로 396',
    lat: 37.4979,
    lng: 127.0276,
    facilities: ['재떨이', '그늘'],
    pin_type: 'blue',
    last_verified: '2026-06-29',
    verify_count: 47,
    nearby_store: 'GS25 강남역점',
  },
  {
    id: 2,
    name: '홍대입구역 2번 출구 흡연구역',
    address: '서울 마포구 양화로 160',
    lat: 37.5574,
    lng: 126.9238,
    facilities: ['재떨이'],
    pin_type: 'orange',
    last_verified: '2026-06-01',
    verify_count: 23,
    nearby_store: 'CU 홍대입구역점',
  },
  {
    id: 3,
    name: '신촌역 1번 출구 흡연구역',
    address: '서울 서대문구 신촌로 83',
    lat: 37.5551,
    lng: 126.9368,
    facilities: ['재떨이', '그늘', '의자'],
    pin_type: 'star',
    last_verified: '2026-06-28',
    verify_count: 91,
    nearby_store: 'GS25 신촌역점',
  },
  {
    id: 4,
    name: '건대입구역 1번 출구 흡연구역',
    address: '서울 광진구 능동로 217',
    lat: 37.5402,
    lng: 127.0694,
    facilities: ['재떨이'],
    pin_type: 'blue',
    last_verified: '2026-06-27',
    verify_count: 18,
  },
  {
    id: 5,
    name: '이태원역 3번 출구 흡연구역',
    address: '서울 용산구 이태원로 177',
    lat: 37.5345,
    lng: 126.9944,
    facilities: ['재떨이', '그늘'],
    pin_type: 'blue',
    last_verified: '2026-06-30',
    verify_count: 34,
    nearby_store: 'CU 이태원역점',
  },
  {
    id: 6,
    name: '종로3가역 5번 출구 흡연구역',
    address: '서울 종로구 종로 116',
    lat: 37.5714,
    lng: 126.9921,
    facilities: ['재떨이'],
    pin_type: 'orange',
    last_verified: '2026-05-20',
    verify_count: 12,
  },
  {
    id: 7,
    name: '여의도역 3번 출구 흡연구역',
    address: '서울 영등포구 국제금융로 10',
    lat: 37.5215,
    lng: 126.9244,
    facilities: ['재떨이', '그늘', '의자'],
    pin_type: 'star',
    last_verified: '2026-06-25',
    verify_count: 67,
    nearby_store: 'GS25 여의도역점',
  },
  {
    id: 8,
    name: '삼성역 6번 출구 흡연구역',
    address: '서울 강남구 테헤란로 511',
    lat: 37.5087,
    lng: 127.0631,
    facilities: ['재떨이'],
    pin_type: 'blue',
    last_verified: '2026-06-26',
    verify_count: 29,
  },
]
