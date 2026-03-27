// app/_components/main-page-section/main-page-section.tsx
import { MainPageCard } from '@/components/common/main-page-card';
import type { MeetingWithHost } from '@/types/generated-client';

const MOCK_DATA: MeetingWithHost[] = [
  {
    id: 1,
    teamId: 'team-001',
    name: '강남역 근처 혼밥 모임',
    type: 'groupEat',
    region: '강남구',
    address: '서울 강남구 강남대로 지하 396',
    latitude: 37.498095,
    longitude: 127.02761,
    dateTime: new Date('2026-03-28T12:00:00'),
    registrationEnd: new Date('2026-03-27T23:59:00'),
    capacity: 5,
    participantCount: 3,
    image: '/images/placeholder-food.png',
    description: '강남역 근처에서 같이 밥 먹어요!',
    canceledAt: new Date('2099-12-31'),
    confirmedAt: new Date('2099-12-31'),
    hostId: 1,
    createdBy: 1,
    createdAt: new Date('2026-03-01'),
    updatedAt: new Date('2026-03-01'),
    host: {
      id: 1,
      name: '김소소',
      image: '/icons/human-basic.svg',
    },
    isFavorited: false,
  },
  {
    id: 2,
    teamId: 'team-002',
    name: '마트 공동구매 같이해요',
    type: 'groupBuy',
    region: '마포구',
    address: '서울 마포구 홍익로 지하 20',
    latitude: 37.556591,
    longitude: 126.922897,
    dateTime: new Date('2026-03-29T18:00:00'),
    registrationEnd: new Date('2026-03-28T23:59:00'),
    capacity: 4,
    participantCount: 2,
    image: '/images/placeholder-food.png',
    description: '마트 공동구매 같이해요!',
    canceledAt: new Date('2099-12-31'),
    confirmedAt: new Date('2099-12-31'),
    hostId: 2,
    createdBy: 2,
    createdAt: new Date('2026-03-01'),
    updatedAt: new Date('2026-03-01'),
    host: {
      id: 2,
      name: '이잇',
      image: '/icons/human-basic.svg',
    },
    isFavorited: false,
  },
];

export function MainPageSection() {
  return (
    <section className="px-4 py-6">
      <h2 className="mb-4 text-lg font-bold">모임 둘러보기</h2>
      <div className="flex flex-col gap-4">
        {MOCK_DATA.map((meeting) => (
          <MainPageCard key={meeting.id} meeting={meeting} />
        ))}
      </div>
    </section>
  );
}
